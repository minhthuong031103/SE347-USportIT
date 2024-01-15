import { ReduxProvider } from '@/redux/Provider';
import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '@/components/providers/query-provider';
import AuthProvider from '../../context/AuthProvider';
import { Web3Provider } from '@/components/providers/web3-provider';
import { ChainProvider } from '@/components/providers/chain-provider';
import UniqueIdProvider from '@/components/providers/unique-id-provider';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
  weight: '500',
});

const metadata: Metadata = {
  title: 'Elite Motion',
  description: 'Just Do It By Elite Motion',
  openGraph: {
    images: [
      'https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1423,c_limit/16b3442b-cfbb-4be0-8541-682a26631f15/nike-just-do-it.png',
      'https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1423,c_limit/b3e44fd7-df8f-449a-a2c7-48bb948518ab/men-s-shoes-clothing-accessories.png',
      'https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1423,c_limit/481ae448-c295-48cb-b593-fbb80821d102/jordan.png',
    ],
  },
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${montserrat.style.fontWeight} font-mont`}
      >
        <ChainProvider>
          <AuthProvider>
            <UniqueIdProvider>
              <Web3Provider>
                <ReduxProvider>
                  <QueryProvider>
                    <Toaster />
                    {children}
                  </QueryProvider>
                </ReduxProvider>
              </Web3Provider>
            </UniqueIdProvider>
          </AuthProvider>
        </ChainProvider>
      </body>
    </html>
  );
};
export { metadata };
export default RootLayout;
