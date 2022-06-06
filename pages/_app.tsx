import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ModalProvider } from '@/components/modal/use-modal';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <ModalProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />{' '}
      </SessionProvider>
    </ModalProvider>
  );
}
