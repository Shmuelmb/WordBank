import "./globals.css";
import { NextAuthProvider } from "./NextAuthProvider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "word-bank",
  description: "word bank",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body suppressHydrationWarning={true}>
          <Navbar />
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
