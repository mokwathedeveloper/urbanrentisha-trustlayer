#![no_std]
use soroban_sdk::{contract, contracterror, contractimpl, contracttype, token, Address, BytesN, Env};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum EscrowError {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    HoldAlreadyExists = 3,
    HoldNotFound = 4,
    HoldNotHeld = 5,
    InvalidFeeBps = 6,
}

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[contracttype]
pub enum HoldStatus {
    Held,
    Released,
    Refunded,
}

#[derive(Clone)]
#[contracttype]
pub struct Hold {
    pub payer: Address,
    pub token: Address,
    pub amount: i128,
    pub status: HoldStatus,
}

#[contracttype]
enum DataKey {
    Admin,
    PlatformFeeBps,
    Hold(BytesN<32>),
}

const BPS_DENOMINATOR: i128 = 10_000;

#[contract]
pub struct UrbanRentishaEscrow;

#[contractimpl]
impl UrbanRentishaEscrow {
    /// Sets the platform admin (the only address allowed to call `release`
    /// and `refund`) and the platform fee, in basis points, taken on release.
    pub fn init(env: Env, admin: Address, platform_fee_bps: u32) -> Result<(), EscrowError> {
        if env.storage().instance().has(&DataKey::Admin) {
            return Err(EscrowError::AlreadyInitialized);
        }
        if platform_fee_bps as i128 > BPS_DENOMINATOR {
            return Err(EscrowError::InvalidFeeBps);
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage()
            .instance()
            .set(&DataKey::PlatformFeeBps, &platform_fee_bps);
        Ok(())
    }

    /// Deposits `amount` of `token` from `payer` into escrow, keyed by
    /// `payment_id`. Requires the payer's own signature - the platform
    /// cannot deposit on a user's behalf.
    pub fn deposit(
        env: Env,
        payer: Address,
        token: Address,
        payment_id: BytesN<32>,
        amount: i128,
    ) -> Result<(), EscrowError> {
        payer.require_auth();

        let key = DataKey::Hold(payment_id);
        if env.storage().persistent().has(&key) {
            return Err(EscrowError::HoldAlreadyExists);
        }

        let token_client = token::Client::new(&env, &token);
        token_client.transfer(&payer, &env.current_contract_address(), &amount);

        env.storage().persistent().set(
            &key,
            &Hold {
                payer,
                token,
                amount,
                status: HoldStatus::Held,
            },
        );
        Ok(())
    }

    /// Releases a held payment to the landlord, minus the platform fee.
    /// Only callable by the admin set at `init` (the platform), after it has
    /// confirmed the off-chain condition (e.g. ZK proof verified).
    pub fn release(env: Env, payment_id: BytesN<32>, landlord: Address) -> Result<(), EscrowError> {
        let admin = Self::require_admin(&env)?;
        admin.require_auth();

        let key = DataKey::Hold(payment_id);
        let mut hold: Hold = env
            .storage()
            .persistent()
            .get(&key)
            .ok_or(EscrowError::HoldNotFound)?;
        if hold.status != HoldStatus::Held {
            return Err(EscrowError::HoldNotHeld);
        }

        let fee_bps: u32 = env
            .storage()
            .instance()
            .get(&DataKey::PlatformFeeBps)
            .unwrap_or(0);
        let fee = (hold.amount * fee_bps as i128) / BPS_DENOMINATOR;
        let payout = hold.amount - fee;

        let token_client = token::Client::new(&env, &hold.token);
        token_client.transfer(&env.current_contract_address(), &landlord, &payout);
        if fee > 0 {
            token_client.transfer(&env.current_contract_address(), &admin, &fee);
        }

        hold.status = HoldStatus::Released;
        env.storage().persistent().set(&key, &hold);
        Ok(())
    }

    /// Refunds a held payment back to the original payer. Only callable by
    /// the admin, for disputes/cancellations.
    pub fn refund(env: Env, payment_id: BytesN<32>) -> Result<(), EscrowError> {
        let admin = Self::require_admin(&env)?;
        admin.require_auth();

        let key = DataKey::Hold(payment_id);
        let mut hold: Hold = env
            .storage()
            .persistent()
            .get(&key)
            .ok_or(EscrowError::HoldNotFound)?;
        if hold.status != HoldStatus::Held {
            return Err(EscrowError::HoldNotHeld);
        }

        let token_client = token::Client::new(&env, &hold.token);
        token_client.transfer(&env.current_contract_address(), &hold.payer, &hold.amount);

        hold.status = HoldStatus::Refunded;
        env.storage().persistent().set(&key, &hold);
        Ok(())
    }

    /// Returns the current state of a hold.
    pub fn get_hold(env: Env, payment_id: BytesN<32>) -> Result<Hold, EscrowError> {
        env.storage()
            .persistent()
            .get(&DataKey::Hold(payment_id))
            .ok_or(EscrowError::HoldNotFound)
    }

    fn require_admin(env: &Env) -> Result<Address, EscrowError> {
        env.storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(EscrowError::NotInitialized)
    }
}

mod test;
