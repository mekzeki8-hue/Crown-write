import { Polar } from "@polar-sh/sdk";

// Initialize Polar client
export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || "",
  server: process.env.POLAR_ENVIRONMENT === "production" ? "production" : "sandbox",
});

// Organization ID from Polar dashboard
export const POLAR_ORG_ID = process.env.POLAR_ORGANIZATION_ID || "";

// Product configuration with monthly, yearly, and top-up options
export const PRODUCTS = {
  BASIC: {
    monthly: {
      id: process.env.POLAR_PRODUCT_BASIC_MONTHLY || "",
      name: "Basic Monthly",
      credits: 10000, // 10k words/month
      price: 5.99,
      billing: "monthly",
    },
    yearly: {
      id: process.env.POLAR_PRODUCT_BASIC_YEARLY || "",
      name: "Basic Yearly",
      credits: 120000, // 10k words/month × 12
      price: 35.88,
      billing: "yearly",
    },
    topup: {
      id: process.env.POLAR_PRODUCT_BASIC_TOPUP || "",
      name: "Basic Top-up",
      credits: 10000, // One-time 10k words
      price: 5.99,
      billing: "one-time",
    },
  },
  PRO: {
    monthly: {
      id: process.env.POLAR_PRODUCT_PRO_MONTHLY || "",
      name: "Pro Monthly",
      credits: 50000, // 50k words/month
      price: 19.99,
      billing: "monthly",
    },
    yearly: {
      id: process.env.POLAR_PRODUCT_PRO_YEARLY || "",
      name: "Pro Yearly",
      credits: 600000, // 50k words/month × 12
      price: 119.88,
      billing: "yearly",
    },
    topup: {
      id: process.env.POLAR_PRODUCT_PRO_TOPUP || "",
      name: "Pro Top-up",
      credits: 50000, // One-time 50k words
      price: 19.99,
      billing: "one-time",
    },
  },
  MAX: {
    monthly: {
      id: process.env.POLAR_PRODUCT_MAX_MONTHLY || "",
      name: "Max Monthly",
      credits: 999999, // Unlimited
      price: 39.99,
      billing: "monthly",
    },
    yearly: {
      id: process.env.POLAR_PRODUCT_MAX_YEARLY || "",
      name: "Max Yearly",
      credits: 999999, // Unlimited
      price: 239.88,
      billing: "yearly",
    },
    topup: {
      id: process.env.POLAR_PRODUCT_MAX_TOPUP || "",
      name: "Max Top-up",
      credits: 100000, // One-time 100k words
      price: 39.99,
      billing: "one-time",
    },
  },
};

// Helper to get credits by product ID
export function getCreditsByProductId(productId: string): number {
  for (const tier of Object.values(PRODUCTS)) {
    for (const variant of Object.values(tier)) {
      if (variant.id === productId) {
        return variant.credits;
      }
    }
  }
  return 0;
}

// Helper to get product details by ID
export function getProductById(productId: string) {
  for (const [tierName, tier] of Object.entries(PRODUCTS)) {
    for (const [variantName, variant] of Object.entries(tier)) {
      if (variant.id === productId) {
        return { ...variant, tier: tierName, variant: variantName };
      }
    }
  }
  return null;
}

// Get all product IDs as a flat array
export function getAllProductIds(): string[] {
  const ids: string[] = [];
  for (const tier of Object.values(PRODUCTS)) {
    for (const variant of Object.values(tier)) {
      if (variant.id) ids.push(variant.id);
    }
  }
  return ids;
}
