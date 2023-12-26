import { Inter } from 'next/font/google';
import './globals.css';
import { PokemonProvider } from '../context/PokemonContext';
const inter = Inter({ subsets: ['latin'] });
import Search from '@/components/Search';
export const metadata = {
  title: {
    template: 'Pokemon | %s',
    default: 'Pokemon',
  },
  description: 'pokemon details',
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
      </head>
      <body className={inter.className}>
        <PokemonProvider>
          {children}
          {modal}
        </PokemonProvider>
      </body>
    </html>
  );
}
