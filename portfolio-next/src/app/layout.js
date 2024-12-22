import '@/app/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-stone-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
