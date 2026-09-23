import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "compute",
    description: "IT services for your success",
    start_url: "/",
    display: "standalone",
    background_color: "#040915",
    theme_color: "#040915",
    icons: [
      { src: "/icon.png", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/logo.png", sizes: "364x382", type: "image/png", purpose: "any" },
    ],
  };
}
