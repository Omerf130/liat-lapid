import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import "./globals.scss";

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ליאת לפיד | משרד עורכי דין — דיני עבודה",
    template: "%s | ליאת לפיד",
  },
  description: "משרד עורכי דין ליאת לפיד — ייעוץ וייצוג בתחום דיני העבודה",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${frankRuhl.variable} ${heebo.variable}`}>
        {children}
      </body>
    </html>
  );
}
