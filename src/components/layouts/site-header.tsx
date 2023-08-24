import { Combobox } from '@/components/combobox';
import { Icons } from '@/components/icons';
import { MainNav } from '@/components/layouts/main-nav';
import { Button, buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import type { User } from '@clerk/nextjs/dist/types/server';
import Link from 'next/link';

interface SiteHeaderProps {
  user: User | null;
}

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Combobox />
            <Link
              href="/signin"
              className={buttonVariants({
                size: 'sm'
              })}
            >
              Sign In
              <span className="sr-only">Sign In</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
