import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mithila Rasoi | Authentic Maithil Cuisine",
  description: "A modern celebration of traditional Maithil culture, cuisine, and art.",
  icons: {
    icon: '/logo.png', // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
