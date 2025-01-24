import { Orbitron, JetBrains_Mono } from 'next/font/google';
import './styles/globals.css';
import './styles/grid-background.css';

import { Toaster } from 'sonner';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${jetbrainsMono.variable} dark h-full`}>
      <body className="h-full font-mono">
        <div className="grid-background" />
        <div className="flex flex-col min-h-screen pt-[72px]">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8 mb-8">{children}</main>
          <div className="fixed bottom-0 left-0 right-0 z-10">
            <Footer />
          </div>
        </div>
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: 'hsl(var(--cyber-darker-hsl))',
              border: '1px solid hsl(var(--cyber-purple-hsl))',
              color: 'hsl(var(--cyber-white-hsl))',
              fontFamily: 'inherit',
            },
          }}
        />
      </body>
    </html>
  );
}
