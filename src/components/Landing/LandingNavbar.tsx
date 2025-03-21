'use client';

import { ThemeToggle } from '@/components/general/ThemeToggle';
import UserDropdown from '@/components/general/UserDropdown';
import { Button, buttonVariants } from '@/components/ui/button';
import { LinkIcon, Menu, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LandingNavbar() {
  const { data: session, status, update } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      update(); // Force refresh session
    }
  }, [status, update]);

  return (
    <nav className="m-0 flex w-full items-center justify-between border-b border-gray-200 px-4 py-5">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <LinkIcon className="size-6 text-primary" />
          <span className="text-xl font-bold">ExpenseVision</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
        <Link href="#features" className="text-muted-foreground transition hover:text-foreground" onClick={() => setIsMenuOpen(false)}>Features</Link>
        <Link href="#analytics" className="text-muted-foreground transition hover:text-foreground" onClick={() => setIsMenuOpen(false)}>Analytics</Link>
      </div>

      {/* Right Side - Desktop: Theme Toggle + Login/User */}
      <div className="hidden items-center gap-5 md:flex">

        <ThemeToggle />
        {status === 'authenticated' && session?.user
          ? (
              <>
                <Link href="/dashboard" className={buttonVariants({ variant: 'default', size: 'lg' })}>
                  Analyze Your Expense
                </Link>
                <UserDropdown
                  email={session.user.email as string}
                  name={session.user.name as string}
                  image={session.user.image as string}
                />
              </>
            )
          : status !== 'loading' && (
            <Link href="/login" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              Login
            </Link>
          )}
      </div>

      {/* Mobile: Login Button + Hamburger Menu */}
      <div className="flex items-center gap-4 md:hidden">
        {status !== 'loading' && !session?.user && (
          <Link href="/login" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            Login
          </Link>
        )}

        {status === 'authenticated' && session?.user && (
          <UserDropdown
            email={session.user.email as string}
            name={session.user.name as string}
            image={session.user.image as string}
          />
        )}

        {/* Mobile Navigation Button (Hamburger) */}
        <Button
          variant="ghost"
          className="text-primary focus:outline-none md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col gap-6 bg-white p-6 shadow-lg md:hidden">
          {/* Close Button */}
          <Button
            variant="ghost"
            className="absolute right-6 top-6"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="size-8" />
          </Button>

          <div className="mt-12 flex flex-col gap-6 px-2">
            <Link href="#features" className="text-lg text-gray-800" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link href="#pricing" className="text-lg text-gray-800" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <Link href="#analytics" className="text-lg text-gray-800" onClick={() => setIsMenuOpen(false)}>Analytics</Link>
            <ThemeToggle />

            {status === 'authenticated' && session?.user && (
              <Link
                href="/dashboard/links"
                className={buttonVariants({ variant: 'default', size: 'lg' })}
                onClick={() => setIsMenuOpen(false)}
              >
                Manage Your Expenses
              </Link>
            )}

            {/* Show Logout in mobile menu if logged in */}
            {session?.user
              ? (
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg"
                    onClick={async () => {
                      await signOut({ redirectTo: '/' });
                      setIsMenuOpen(false);
                      window.location.reload();
                    }}
                  >
                    Logout
                  </Button>
                )
              : (
                  <Link href="/login" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                    Login
                  </Link>
                )}
          </div>
        </div>
      )}
    </nav>
  );
}
