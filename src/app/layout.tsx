import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "encurta ai",
  description: "o melhor encurtador de links do mundo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="PT-BR">
      <SessionProvider>
      <body className={inter.className}>
        {children}
        <footer>
          &copy; 2025 Encurta Ai!. Todos os direitos reservados. Feito por Ian Lucas
        </footer>
      </body>
      </SessionProvider>
    </html>
  );
}
