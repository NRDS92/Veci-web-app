import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "VECI – Latin Events & Community in Europe",
  description:
    "Discover Latin events, restaurants, and businesses across Europe. Connect with your community abroad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}

        <Script
          src="https://kit.fontawesome.com/fe8085a031.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}