'use client';
import { sidebarItems } from '@/app/data/sidebar';
import { Button } from '@/components/ui/button';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ClientSidebar() {
  const { state, toggleSidebar } = useSidebar();

  const pathname = usePathname();

  return (
    <>
      <SidebarContent>
        <div id="sidebar" className="flex h-full flex-col">
          <div className="p-4">
            <Link href="/" className="flex items-center gap-2">
              <h1 className={cn(
                'font-bold transition-all duration-300',
                state === 'collapsed' ? 'text-xl text-center' : 'text-2xl',
              )}
              >
                {state === 'collapsed' ? 'EV' : 'ExpenseVision'}
              </h1>
            </Link>
          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => {
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        asChild
                        data-active={pathname === item.value}
                        className=" data-[active=true]:text-blue-600"
                      >
                        <Link
                          href={item.value}
                          className="flex w-full justify-start px-4 py-3 text-lg hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400"
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

        </div>
        <Button
          variant="link"
          onClick={() => toggleSidebar()}
          className="flex items-center justify-center p-4"
        >
          {state === 'collapsed'
            ? (
                <ChevronRight className="size-5" />
              )
            : (
                <ChevronLeft className="size-5" />
              )}
        </Button>
      </SidebarContent>
    </>
  );
}
