
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