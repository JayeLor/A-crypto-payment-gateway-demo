/**
 * LittleCPay — xpub Address Derivation Example
 * --------------------------------------------
 * ⚠️ DOCUMENTATION ONLY — DO NOT RUN IN FRONTEND
 *
 * This file demonstrates how LittleCPay derives
 * unique deposit addresses from merchant XPUBs.
 *
 * - Non-custodial
 * - No private keys stored
 * - One address per deposit
 *
 * Used by backend services ONLY.
 */

/* -----------------------------
   XPUBS (EXAMPLES — NOT REAL)
-------------------------------- */

// Merchant provides these during onboarding
const XPUB_EVM =
  "xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKpZ8uZPp8zXexampleEVM";

const XPUB_TRON =
  "xpub6FZexampleTRONderivationkeyONLY";

/* -----------------------------
   BIP44 DERIVATION PATHS
-------------------------------- */

/**
 * EVM (ETH / BSC / Polygon)
 * Coin Type: 60
 * Path: m/44'/60'/0'/0/index
 */
function deriveEvmPath(index) {
  return `m/44'/60'/0'/0/${index}`;
}

/**
 * TRON (TRC20)
 * Coin Type: 195
 * Path: m/44'/195'/0'/0/index
 */
function deriveTronPath(index) {
  return `m/44'/195'/0'/0/${index}`;
}

/* -----------------------------
   ADDRESS DERIVATION (PSEUDO)
-------------------------------- */

/**
 * In production, a crypto library like:
 * - bitcoinjs-lib
 * - ethers
 * - tronweb
 * would be used here.
 *
 * This is pseudocode to explain flow.
 */

function deriveAddressFromXpub({ xpub, network, index }) {
  const path =
    network === "TRC20"
      ? deriveTronPath(index)
      : deriveEvmPath(index);

  return {
    network,
    xpub_used: xpub,
    derivation_path: path,
    address: "<derived_address_here>"
  };
}

/* -----------------------------
   DEPOSIT FLOW EXAMPLE
-------------------------------- */

const depositIndex = 42;

const evmDeposit = deriveAddressFromXpub({
  xpub: XPUB_EVM,
  network: "BEP20",
  index: depositIndex
});

const tronDeposit = deriveAddressFromXpub({
  xpub: XPUB_TRON,
  network: "TRC20",
  index: depositIndex
});

/**
 * RESULT (what backend stores):
 *
 * - deposit_id
 * - merchant_id
 * - address
 * - derivation_path
 * - xpub fingerprint
 *
 * Funds go directly to merchant wallet.
 */
