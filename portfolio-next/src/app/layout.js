import "@/app/globals.css";

export const metadata = {
  title: "Avery Clapp",
  icons: {
    icon: "/file.svg", // Path to your icon in public/
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-stone-50 min-h-screen">{children}</body>
    </html>
  );
}
