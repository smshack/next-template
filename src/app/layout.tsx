import '@/styles/globals.css';

import Login from '@/components/modals/Login';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
// getServerSession은 로그인, 로그아웃 상태를 받을 수 있다.
import { getServerSession } from 'next-auth/next';
import SessionProvider from '@/utils/SessionProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: any = await getServerSession();
  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col min-h-screen">
          <SessionProvider session={session}>
            <Header />
            <main className="flex-grow flex max-w-full flex-col py-12 px-28">
              {children}
            </main>
            <Footer />
            <Login />
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
