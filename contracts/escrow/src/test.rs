#![cfg(test)]
extern crate std;

use soroban_sdk::{
    testutils::Address as _,
    token::{StellarAssetClient, TokenClient},
    Address, BytesN, Env,
};

use crate::{HoldStatus, UrbanRentishaEscrow, UrbanRentishaEscrowClient};

fn setup<'a>(
    env: &Env,
) -> (
    UrbanRentishaEscrowClient<'a>,
    Address,
    TokenClient<'a>,
    StellarAssetClient<'a>,
    Address,
) {
    let contract_id = env.register(UrbanRentishaEscrow {}, ());
    let client = UrbanRentishaEscrowClient::new(env, &contract_id);

    let token_admin = Address::generate(env);
    let token_contract_id = env.register_stellar_asset_contract_v2(token_admin.clone());
    let token_client = TokenClient::new(env, &token_contract_id.address());
    let token_admin_client = StellarAssetClient::new(env, &token_contract_id.address());

    let admin = Address::generate(env);
    client.init(&admin, &500u32); // 5% platform fee

    (client, contract_id, token_client, token_admin_client, admin)
}

#[test]
fn test_deposit_then_release_pays_landlord_minus_fee() {
    let env = Env::default();
    env.mock_all_auths();

    let (client, contract_id, token_client, token_admin_client, _admin) = setup(&env);

    let payer = Address::generate(&env);
    let landlord = Address::generate(&env);
    token_admin_client.mint(&payer, &10_000);

    let payment_id = BytesN::from_array(&env, &[1u8; 32]);
    client.deposit(&payer, &token_client.address, &payment_id, &10_000);

    // Funds left the payer and are now held by the contract.
    assert_eq!(token_client.balance(&payer), 0);
    assert_eq!(token_client.balance(&contract_id), 10_000);

    let hold = client.get_hold(&payment_id);
    assert_eq!(hold.status, HoldStatus::Held);
    assert_eq!(hold.amount, 10_000);

    client.release(&payment_id, &landlord);

    // 5% fee (500 bps) goes to the admin, the rest to the landlord.
    assert_eq!(token_client.balance(&landlord), 9_500);
    assert_eq!(token_client.balance(&contract_id), 0);

    let released = client.get_hold(&payment_id);
    assert_eq!(released.status, HoldStatus::Released);
}

#[test]
fn test_deposit_then_refund_returns_full_amount_to_payer() {
    let env = Env::default();
    env.mock_all_auths();

    let (client, contract_id, token_client, token_admin_client, _admin) = setup(&env);

    let payer = Address::generate(&env);
    token_admin_client.mint(&payer, &5_000);

    let payment_id = BytesN::from_array(&env, &[2u8; 32]);
    client.deposit(&payer, &token_client.address, &payment_id, &5_000);
    assert_eq!(token_client.balance(&payer), 0);

    client.refund(&payment_id);

    assert_eq!(token_client.balance(&payer), 5_000);
    assert_eq!(token_client.balance(&contract_id), 0);

    let refunded = client.get_hold(&payment_id);
    assert_eq!(refunded.status, HoldStatus::Refunded);
}

#[test]
fn test_double_deposit_with_same_payment_id_fails() {
    let env = Env::default();
    env.mock_all_auths();

    let (client, _contract_id, token_client, token_admin_client, _admin) = setup(&env);

    let payer = Address::generate(&env);
    token_admin_client.mint(&payer, &10_000);

    let payment_id = BytesN::from_array(&env, &[3u8; 32]);
    client.deposit(&payer, &token_client.address, &payment_id, &5_000);

    let result = client.try_deposit(&payer, &token_client.address, &payment_id, &5_000);
    assert!(result.is_err());
}

#[test]
fn test_release_on_already_released_hold_fails() {
    let env = Env::default();
    env.mock_all_auths();

    let (client, _contract_id, token_client, token_admin_client, _admin) = setup(&env);

    let payer = Address::generate(&env);
    let landlord = Address::generate(&env);
    token_admin_client.mint(&payer, &1_000);

    let payment_id = BytesN::from_array(&env, &[4u8; 32]);
    client.deposit(&payer, &token_client.address, &payment_id, &1_000);
    client.release(&payment_id, &landlord);

    let result = client.try_release(&payment_id, &landlord);
    assert!(result.is_err());
}
