import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';

export default async function IndexPage() {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server');
  }

  return <div className="font-sans">{session ? <h1>123</h1> : <h1 className="text-5xl">123123123ss!</h1>}</div>;
}
