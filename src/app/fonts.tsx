
import {
  Inclusive_Sans,
  Libertinus_Serif,
  JetBrains_Mono,
} from "next/font/google";

export const inclusiveSans = Inclusive_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inclusive-sans",
  display: "swap",
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const libertinusSerif = Libertinus_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-libertinus-serif",
  display: "swap",
  adjustFontFallback: false,
});