import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const familjen = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wajiha.xyz"),
  title: "Wajiha Kulsum, product designer and front-end developer",
  description:
    "Portfolio of Wajiha Kulsum, a Mumbai-based designer-engineer blending UX/UI and full-stack development to build intuitive, high-impact digital products.",
  openGraph: {
    title: "Wajiha Kulsum, product designer and front-end developer",
    description:
      "Meridian, AkaiSpace, AkaiEarn and more: interfaces designed and built by Wajiha Kulsum.",
    url: "https://wajiha.xyz",
    siteName: "Wajiha Kulsum",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `https://avatars.githubusercontent.com/wajiha-kulsum?size=512`,
        width: 512,
        height: 512,
        alt: "Wajiha Kulsum",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Wajiha Kulsum, product designer and front-end developer",
    description: "Work, experience, and a live GitHub contributions graph.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0f" },
  ],
};

/**
 * Runs before first paint: an explicit saved choice wins, otherwise the
 * theme follows the device's OS color scheme. Either way there is no flash.
 */
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.dataset.theme="dark";}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${familjen.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Skip link: first tab stop on the page, for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
