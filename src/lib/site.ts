export const site = {
  name: "compute.uz",
  url: "https://compute.uz",
  // Personal contact for requests
  telegram: "https://t.me/full_swe",
  telegramHandle: "@full_swe",
  // Public channel
  channel: "https://t.me/compute_uz",
  channelHandle: "@compute_uz",
  phone: "+998 94 707 67 72",
  phoneHref: "tel:+998947076772",
  email: "rahmiddinasiydinov@gmail.com",
};

export const serviceKeys = ["os", "software", "web", "automation", "legal"] as const;
export type ServiceKey = (typeof serviceKeys)[number];

/** Starting prices in UZS for structured data (null = on request). Keep in sync with messages `services.page.prices`. */
export const servicePrices: Record<ServiceKey, number | null> = {
  os: 150_000,
  software: 100_000,
  web: 3_000_000,
  automation: null,
  legal: 0,
};
