import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coffee Shop Atmosphere",
  description: "Coffee Shop Atmosphere",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital@0;1&display=swap" rel="stylesheet" />  
      </head>
      <body
        className="antialiased font-nunito"
      >
        {children}
      </body>
    </html>
  );
}
