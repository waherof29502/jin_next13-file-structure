import { LogOutButtons } from '@/components/auth/logout-buttons';
import { Shell } from '@/components/shells/shell';

export default function SignOutPage() {
  return (
    <Shell className="max-w-xs">
      <LogOutButtons />
    </Shell>
  );
}
