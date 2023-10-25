import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';

export default async function IndexPage() {
  const session = await getServerSession();
  // if (!session) {
  //   redirect('/api/auth/signin?callbackUrl=/server');
  // }

  return (
    <>
      getServerSession Result
      {session?.user ? <div>{session?.user?.name}login</div> : <div>Not logged in</div>}
    </>
  );
}
