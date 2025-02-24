'use client';

import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { BarChart, ChevronLeft, ChevronRight, Home, Target, Wallet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', value: '/' },
  { icon: Wallet, label: 'Transactions', value: '/transactions' },
  { icon: BarChart, label: 'Reports & Insights', value: '/reports' },
  { icon: Target, label: 'Budgets', value: '/budgets' },
];

export default function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <SidebarContent>
      <div id="sidebar" className="flex h-full flex-col">
        <div className="p-4">
          <h1 className={cn(
            'font-bold transition-all duration-300',
            state === 'collapsed' ? 'text-xl text-center' : 'text-2xl',
          )}
          >
            {state === 'collapsed' ? 'ET' : 'ExpenseTracker'}
          </h1>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isActive = pathname === item.value; // Determine if the item is active
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                    >
                      <Link
                        href={item.value}
                        className={cn(
                          'w-full flex text-lg justify-start px-4 py-3',
                          isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-100', // Change styles based on isActive
                        )}
                      >
                        <item.icon className="size-10" />
                        {state === 'expanded' && (
                          <span className="ml-3">{item.label}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarMenuButton
          onClick={() => toggleSidebar()}
          className="flex items-center justify-center p-4 hover:bg-gray-100"
        >
          {state === 'collapsed'
            ? (
                <ChevronRight className="size-5" />
              )
            : (
                <ChevronLeft className="size-5" />
              )}
        </SidebarMenuButton>
      </div>
    </SidebarContent>
  );
}
