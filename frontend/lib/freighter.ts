"use client";

export interface WalletStatus {
  isInstalled: boolean;
  isConnected: boolean;
  isAllowed: boolean;
  publicKey: string | null;
}

/** Check full Freighter wallet status. Freighter is a browser extension, not available during SSR. */
export async function checkWalletStatus(): Promise<WalletStatus> {
  if (typeof window === "undefined") {
    return { isInstalled: false, isConnected: false, isAllowed: false, publicKey: null };
  }

  try {
    const { isConnected, isAllowed, getAddress } = await import("@stellar/freighter-api");

    const connected = await isConnected();
    if (!connected.isConnected) {
      return { isInstalled: true, isConnected: false, isAllowed: false, publicKey: null };
    }

    const allowed = await isAllowed();
    const publicKey = allowed.isAllowed ? (await getAddress()).address : null;

    return { isInstalled: true, isConnected: true, isAllowed: allowed.isAllowed, publicKey };
  } catch {
    return { isInstalled: false, isConnected: false, isAllowed: false, publicKey: null };
  }
}

/** Request wallet permission and return the connected public key. */
export async function connectWallet(): Promise<{ publicKey: string }> {
  if (typeof window === "undefined") throw new Error("Cannot connect wallet on server.");

  const { isConnected, setAllowed, getAddress } = await import("@stellar/freighter-api");
  const connected = await isConnected();

  if (!connected.isConnected) {
    throw new Error("Freighter is not installed. Install it from https://freighter.app");
  }

  await setAllowed();
  const { address } = await getAddress();
  if (!address) throw new Error("Could not get address from Freighter.");

  return { publicKey: address };
}

/** Shortened public key for display: GABC...WXYZ */
export function shortenKey(publicKey: string): string {
  if (!publicKey || publicKey.length < 8) return publicKey;
  return `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
}

export const FREIGHTER_INSTALL_URL = "https://freighter.app";
