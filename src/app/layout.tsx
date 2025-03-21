/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import { metadata } from '@/app/utils/metadata';

import Providers from '@/components/general/Providers';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <link rel="canonical" href={metadata.openGraph?.url as string} />

        {/* JSON+LD for SEO */}
        <script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              'name': 'ExpenseVision',
              'applicationCategory': 'FinanceApplication',
              'operatingSystem': 'Web, iOS, Android',
              'description':
                'Track expenses, set budgets, and gain financial insights with our intuitive expense tracking app.',
              'offers': {
                '@type': 'Offer',
                'price': '0',
                'priceCurrency': 'USD',
              },
              'aggregateRating': {
                '@type': 'AggregateRating',
                'ratingValue': '4.8',
                'ratingCount': '1246',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster richColors closeButton />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
