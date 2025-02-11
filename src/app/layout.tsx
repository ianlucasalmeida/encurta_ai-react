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
    <html lang="PT-BR" className="h-full">
      <SessionProvider>
        <body className={`${inter.className} min-h-full flex flex-col`}>
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="w-full bg-white border-t border-gray-200 py-6 px-4 mt-auto">
            <div className="container mx-auto">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm text-gray-600">
                <span>&copy; 2025 Encurta Ai!</span>
                <span className="hidden sm:inline">•</span>
                <span>Todos os direitos reservados.</span>
                <span className="hidden sm:inline">•</span>
                <span>Feito por <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Ian Lucas
                </a></span>
              </div>
            </div>
          </footer>
        </body>
      </SessionProvider>
    </html>
  );
}