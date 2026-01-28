import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { ViewTransitions } from "next-view-transitions";
import LinkInterceptor from "@/Components/ViewTransitions/LinkInterceptor";

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
    <html lang="en" className={`${inter.variable} bg-stone-100`}>
      <body className="bg-stone-100 min-h-screen">
        <LinkInterceptor />
        <ViewTransitions>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </ViewTransitions>
      </body>
    </html>
  );
}
