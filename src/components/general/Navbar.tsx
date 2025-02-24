import { auth } from '@/app/utils/auth';
import Logo from '@/public/logos/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';
import TitleBar from './TitleBar';
import UserDropdown from './UserDropdown';

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="m-0 flex w-full items-center justify-between border-b border-gray-200 px-2 py-5">
      {!session
        ? (
            <Link href="/" className="flex items-center gap-2">
              <Image src={Logo} alt="logo" width={50} height={50} />
              <h1 className="text-2xl font-bold">
                Expense Tracker
                <span className="text-primary"> MUN</span>
              </h1>
            </Link>
          )
        : (
            <TitleBar />
          )}
      {/* Desktop Navigation */}
      <div className="hidden items-center gap-5 md:flex">
        <ThemeToggle />
        {session?.user
          ? (
              <UserDropdown
                email={session.user.email as string}
                name={session.user.name as string}
                image={session.user.image as string}
              />
            )
          : (
              <Link
                href="/login"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                Login
              </Link>
            )}
      </div>
    </nav>
  );
}
