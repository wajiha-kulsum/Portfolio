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
 * Applies the saved color scheme before first paint so the page never
 * flashes the wrong theme. Light is the default; dark is opt-in.
 */
const themeScript = `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.dataset.theme="dark";}}catch(e){}`;

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
