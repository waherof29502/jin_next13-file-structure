import { SiteFooter } from '@/components/layouts/SiteFooter';
export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
