import { Polar } from "@polar-sh/sdk";

// Initialize Polar client
export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || "",
  server: process.env.POLAR_ENVIRONMENT === "production" ? "production" : "sandbox",
});

// Organization ID from Polar dashboard
export const POLAR_ORG_ID = process.env.POLAR_ORGANIZATION_ID || "";

// Product IDs - Update these after creating products in Polar dashboard
export const PRODUCTS = {
  STARTER: process.env.POLAR_PRODUCT_STARTER || "",
  PRO: process.env.POLAR_PRODUCT_PRO || "",
  ENTERPRISE: process.env.POLAR_PRODUCT_ENTERPRISE || "",
};

// Credit amounts per product
export const PRODUCT_CREDITS = {
  STARTER: 10000,     // 10k words
  PRO: 50000,         // 50k words
  ENTERPRISE: 999999, // Unlimited
};
