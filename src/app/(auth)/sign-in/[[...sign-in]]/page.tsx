import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
      </div>
      <div className=" mt-3">
        <SignIn />
      </div>
    </div>
  );
}