import "@/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Avery Clapp",
  icons: {
    icon: "/file.svg", // Path to your icon in public/
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-stone-50 min-h-screen">{children}</body>
    </html>
  );
}
