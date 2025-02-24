/* eslint-disable unused-imports/no-unused-vars */
import ClientSidebar from '@/components/general/ClientSidebar';
import Navbar from '@/components/general/Navbar';
import {
  Sidebar,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {
  BarChart,
  Home,
  Target,
  Wallet,
} from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', value: '/' },
  { icon: Wallet, label: 'Transactions', value: '/transactions' },
  { icon: BarChart, label: 'Reports & Insights', value: '/reports' },
  { icon: Target, label: 'Budgets', value: '/budgets' },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <ClientSidebar />
      </Sidebar>
      <main className="w-full">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
