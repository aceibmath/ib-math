// src/lib/products.js
// Aici mapezi Stripe Price IDs → cheie internă + etichetă pentru UI.
// Completează/editează după cum adaugi produse noi.

export const PRICE_TO_PRODUCT = {
  [process.env.STRIPE_PRICE_AA_SL]: {
    key: "AA_SL",
    label: "IB Mathematics Applications & Interpretation SL",
  },
  [process.env.STRIPE_PRICE_AA_HL]: {
    key: "AA_HL",
    label: "IB Mathematics Analysis & Approaches HL",
  },
  // ex: abonament general
  [process.env.STRIPE_PRICE_ANNUAL]: {
    key: "ANNUAL",
    label: "Abonament anual",
  },
};

// Dacă ai doar productId (nu priceId), poți adăuga și aici o mapă secundară.
