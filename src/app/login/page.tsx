import { SignInForm } from '@/components/forms/signin-form';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';

export default async function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-background">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-blue-300 rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Login</h1>
        <SignInForm />
        <p className="text-center">
          123123123
          <Link className="text-indigo-500 hover:underline" href="/register">
            123
          </Link>{' '}
        </p>
      </div>
    </div>
  );
}
