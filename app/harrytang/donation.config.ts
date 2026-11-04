/**
 * SINGLE SOURCE OF TRUTH for every receiving address.
 *
 * The address text, the QR code, the copy button and the explorer links all read
 * from this one object — nothing else in the codebase contains an address, so the
 * QR code can never differ from what is displayed.
 *
 * PREVIEW: every address below is a placeholder. Replace with Harry's public
 * receiving addresses before launch (public addresses only — never keys or seed phrases).
 */
export type CoinId = "btc" | "usdc" | "usdt";

export type Network = {
  id: string;
  label: string;
  /** Token standard shown to the donor, e.g. "TRC-20". */
  standard?: string;
  address: string;
  /** Public explorer, used for "View on explorer" links in the live version. */
  explorer: string;
};

export type Coin = {
  id: CoinId;
  symbol: string;
  name: string;
  glyph: string;
  blurb: string;
  networks: Network[];
};

export const coins: Coin[] = [
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    glyph: "₿",
    blurb: "Native Bitcoin, one network.",
    networks: [
      {
        id: "bitcoin",
        label: "Bitcoin",
        address: "bc1q-PLACEHOLDER-btc-address-0000000000",
        explorer: "https://mempool.space",
      },
    ],
  },
  {
    id: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    glyph: "$",
    blurb: "A dollar stablecoin. Pick a network next.",
    networks: [
      { id: "ethereum", label: "Ethereum", standard: "ERC-20", address: "0xPLACEHOLDER00000000000000000000usdc-eth", explorer: "https://etherscan.io" },
      { id: "base", label: "Base", standard: "ERC-20", address: "0xPLACEHOLDER00000000000000000000usdc-base", explorer: "https://basescan.org" },
      { id: "solana", label: "Solana", standard: "SPL", address: "PLACEHOLDERsolanaUSDCaddress0000000000000", explorer: "https://solscan.io" },
    ],
  },
  {
    id: "usdt",
    symbol: "USDT",
    name: "Tether",
    glyph: "₮",
    blurb: "A dollar stablecoin. Pick a network next.",
    networks: [
      { id: "tron", label: "Tron", standard: "TRC-20", address: "TPLACEHOLDERtronUSDTaddress000000", explorer: "https://tronscan.org" },
      { id: "ethereum", label: "Ethereum", standard: "ERC-20", address: "0xPLACEHOLDER00000000000000000000usdt-eth", explorer: "https://etherscan.io" },
    ],
  },
];

export const getCoin = (id: CoinId | null) => coins.find((c) => c.id === id) ?? null;

export function getNetwork(coinId: CoinId | null, networkId: string | null) {
  const coin = getCoin(coinId);
  if (!coin) return null;
  if (coin.networks.length === 1) return coin.networks[0];
  return coin.networks.find((n) => n.id === networkId) ?? null;
}

/** The value encoded in the QR code. Plain address: works in every wallet scanner. */
export const qrPayload = (n: Network) => n.address;

/** Short, readable label for a coin + network pair. */
export const describe = (c: Coin, n: Network) =>
  `${c.symbol} on ${n.label}${n.standard ? ` (${n.standard})` : ""}`;

// Sample rows for the preview only. The live version reads real transactions
// for the addresses above from a public blockchain API.
export const sampleDonations = [
  { coin: "USDT", net: "Tron", amount: "25.00", when: "2 hours ago", from: "TQ4k…9wXe" },
  { coin: "BTC", net: "Bitcoin", amount: "0.00042", when: "Yesterday", from: "bc1q…m7ra" },
  { coin: "USDC", net: "Base", amount: "10.00", when: "3 days ago", from: "0x91…c2D4" },
  { coin: "USDT", net: "Ethereum", amount: "50.00", when: "Last week", from: "0x5b…1fA0" },
];
