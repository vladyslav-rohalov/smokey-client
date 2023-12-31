import './globals.css';
import { Open_Sans } from 'next/font/google';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import CursorComponent from './components/cursor/cursor';
import RefreshUser from './components/auth/refreshUser';
import { ThemeProvider } from '@mui/material/styles';
import { myTheme } from './lib/theme';
import ReduxProvider from './redux/provider';
import Main from './layout/main/main';
import { layoutMetadata } from '@/app/lib/metadata';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata = layoutMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <ThemeProvider theme={myTheme}>
          <ReduxProvider>
            <RefreshUser />
            <CursorComponent />
            <Header />
            <Main>{children}</Main>
            <Footer />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
