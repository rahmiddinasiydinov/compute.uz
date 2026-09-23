import {
  Bot,
  Globe,
  LayoutGrid,
  Monitor,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "compute.uz",
  url: "https://compute.uz",
  telegram: "https://t.me/computeuz",
  telegramHandle: "@computeuz",
  phone: "+998 90 000 00 00",
  phoneHref: "tel:+998900000000",
  email: "hello@compute.uz",
};

export const serviceKeys = ["os", "software", "web", "automation", "legal"] as const;
export type ServiceKey = (typeof serviceKeys)[number];

export const serviceIcons: Record<ServiceKey, LucideIcon> = {
  os: Monitor,
  software: LayoutGrid,
  web: Globe,
  automation: Bot,
  legal: ShieldCheck,
};
