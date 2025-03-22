/* eslint-disable react-hooks/exhaustive-deps */
// 'use client';

// import Logo from '@/public/logos/logo.png';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { buttonVariants } from '../ui/button';
// import { ThemeToggle } from './ThemeToggle';
// import TitleBar from './TitleBar';
// import UserDropdown from './UserDropdown';

// export default function Navbar() {
//   const { data: session } = useSession();
//   return (
//     <nav className="m-0 flex w-full items-center justify-between border-b border-gray-200 px-2 py-5">
//       {!session
//         ? (
//             <Link href="/" className="flex items-center gap-2">
//               <Image src={Logo} alt="logo" width={50} height={50} />
//               <h1 className="text-2xl font-bold">
//                 ExpenseVision
//                 <span className="text-primary"> MUN</span>
//               </h1>
//             </Link>
//           )
//         : (
//             <TitleBar />
//           )}
//       {/* Desktop Navigation */}
//       <div className="hidden items-center gap-5 md:flex">
//         <ThemeToggle />
//         {session?.user
//           ? (
//               <UserDropdown
//                 email={session.user.email as string}
//                 name={session.user.name as string}
//                 image={session.user.image as string}
//               />
//             )
//           : (
//               <Link
//                 href="/login"
//                 className={buttonVariants({ variant: 'outline', size: 'lg' })}
//               >
//                 Login
//               </Link>
//             )}
//       </div>
//     </nav>
//   );
// }

'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { buttonVariants } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';
import TitleBar from './TitleBar';
import UserDropdown from './UserDropdown';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname(); // Get the current route

  const routes = ['/dashboard', '/transaction', '/budgets', '/reports', '/categories'];

  const isMatchedRoute = useMemo(() => {
    return routes.some(route => pathname.includes(route));
  }, [pathname]); // recompute only when pathname changes

  return (
    <nav className="m-0 flex w-full items-center justify-between border-b border-gray-200 px-2 py-5">
      {/* Left Side: Logo or TitleBar based on session & route */}
      {session?.user && isMatchedRoute
        ? (
            <TitleBar />
          )
        : (
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logos/logo.png" alt="logo" width={50} height={50} />
              <h1 className="text-2xl font-bold">
                ExpenseVision
                <span className="text-primary"> MUN</span>
              </h1>
            </Link>
          )}

      {/* Right Side: Theme Toggle & User/Login */}
      <div className="hidden items-center gap-5 md:flex">

        {session?.user && (pathname === '' || pathname
        === '/'
        ) && (
          <Link href="/dashboard" className={buttonVariants({ variant: 'default', size: 'lg' })}>
            Manage Your Finance
          </Link>
        )}
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
              <Link href="/login" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                Login
              </Link>
            )}
      </div>
    </nav>
  );
}
