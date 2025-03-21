import LoginForm from '@/components/forms/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center ">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center">
          <Image
            src="/logos/logo.png"
            alt="Logo"
            width={40} // or whatever size fits your design
            height={40}
            className="size-10"
          />
          <h1 className="text-2xl font-bold">
            ExpenseVision
            {' '}
            <span className="text-primary">MUN</span>
          </h1>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
