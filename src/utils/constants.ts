export function generateShortUUID() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let uuid = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    uuid += letters[randomIndex];
  }
  return uuid;
}
export const LOCAL_STORAGE_KEYS = {
  USER: 'gain-user',
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  TOKEN_EXPIRE_TIME: 'access_token_expiry',
  WALLET: "wallet details",
  CART: "Carts",
  ORDER: "Orders",
  SUB: "Subs"
} as const;

export function extractEmail(text: string): string | null {
  if (!text) return null; // safeguard for undefined/null/empty

  // Regex pattern for email (case-insensitive)
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0] : null;
}

export const UsersPlan = [
  {
    name: "Asa Plan",
    total: 300000,
    1: 300000,
    365: 850,
    548: 600,
    730: 500
  },
  {
    name: "Ami Plan",
    total: 350000,
    1: 350000,
    365: 1100,
    548: 800,
    730: 700
  },
  {
    name: "Sky Plan",
    total: 400000,
    1: 400000,
    365: 1200,
    548: 1000,
    730: 900
  },
  {
    name: "Slay Plan",
    total: 700000,
    1: 700000,
    365: 2000,
    548: 1600,
    730: 1500
  },
  {
    name: "Merit Plan",
    total: 1000000,
    1: 1000000,
    365: 3000,
    548: 2500,
    730: 2200
  },
  {
    name: "Race Plan",
    total: 1550000,
    1: 1550000,
    365: 5000,
    548: 4500,
    730: 3500
  },
  {
    name: "Combo Plan",
    total: 2100000,
    1: 2100000,
    365: 7000,
    548: 6000,
    730: 5000
  },
  {
    name: "Lamb Plan",
    total: 3000000,
    1: 3000000,
    365: 10000,
    548: 8000,
    730: 7000
  },
  {
    name: "Luxury Plan",
    total: 4500000,
    1: 4500000,
    365: 13500,
    548: 8000,
    730: 7000
  }
]

export function extractEmailFromSpeech(speech: string): string | null {
  if (!speech) return null;

  let text = speech.toLowerCase().trim();

  // Replace common speech words
  text = text
    .replace(/\s+at\s+/g, "@") // "at" → "@"
    .replace(/\sdot\s/g, ".") // "dot" → "."
    .replace(/\s+/g, "") // remove spaces

    // Extra cleanup
    .replace(/(@{2,})/g, "@") // multiple @
    .replace(/(\.{2,})/g, "."); // multiple dots

  // Simple email regex
  const emailRegex =
    /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;

  const match = text.match(emailRegex);
  return match ? match[0] : null;
}
