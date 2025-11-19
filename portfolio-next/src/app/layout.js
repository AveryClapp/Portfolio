import "@/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Avery Clapp",
  description:
    "Portfolio and occasional writing. Technical problems and timeless questions. Writing when there's something worth saying.",
  icons: {
    icon: "/lambda.svg", // Path to your icon in public/
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-stone-50 min-h-screen">{children}</body>
    </html>
  );
}
