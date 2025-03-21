import { Metadata } from 'next';

export const SITE_URL = 'https://expense-tracker-mun.vercel.app/';
export const SITE_NAME = 'ExpenseVision';

export const metadata: Metadata = {
  title: 'ExpenseVision | Modern Expense Tracking App',
  description:
    'Track expenses, set budgets, and gain financial insights with our intuitive expense tracking app. Sign up for free today!',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'ExpenseVision | Modern Expense Tracking App',
    description:
      'Track expenses, set budgets, and gain financial insights with our intuitive expense tracking app.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'ExpenseVision - Modern Expense Tracking App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@expensevision',
    creator: '@expensevision',
    title: 'ExpenseVision | Modern Expense Tracking App',
    description:
      'Track expenses, set budgets, and gain financial insights with our intuitive expense tracking app.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
};
