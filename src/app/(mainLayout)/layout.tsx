import type { ReactNode } from 'react';

import Navbar from '@/components/general/Navbar';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
      <Navbar />
      {children}
    </div>
  );
}
