import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wajiha Kulsum — UX/UI & Full-Stack Developer",
  description:
    "Portfolio of Wajiha Kulsum, a Mumbai-based designer-engineer blending UX/UI and full-stack development to build intuitive, high-impact digital products.",
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
      className={`${bricolage.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
