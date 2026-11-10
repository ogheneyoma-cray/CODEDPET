export const site = {
  name: "Codedpet",
  email: process.env.BUSINESS_EMAIL || "info@codedpet.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://codedpet.com").replace(/\/$/, ""),
  referencePrefix: "CP",
};
