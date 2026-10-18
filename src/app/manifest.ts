import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wajiha Kulsum — Portfolio",
    short_name: "Wajiha",
    description: "UX/UI design and full-stack development portfolio.",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    theme_color: "#101010",
    background_color: "#fcfcfa",
    start_url: "/",
    display: "standalone",
  };
}
