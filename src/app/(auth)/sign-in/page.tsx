import SignInForm from '@/components/forms/signin-form';
import { Shell } from '@/components/shells/shell';

export default async function SignInPage() {
  return (
    <div className="font-sans">
      <SignInForm />
    </div>
  );
}
