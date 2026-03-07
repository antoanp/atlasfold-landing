import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AtlasFold - Local SEO Sofia",
    short_name: "AtlasFold",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F0EB",
    theme_color: "#F5F0EB",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
