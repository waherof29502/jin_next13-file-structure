import { Shell } from '@/components/shells/shell';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell as="div">
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20"
        >
          <section id="footer-branding" aria-labelledby="footer-branding-heading">
            <Link aria-label="Home" href="/" className="flex items-center space-x-2">
              <span className="font-bold">123</span>
            </Link>
          </section>
          <section
            id="footer-links"
            aria-labelledby="footer-links-heading"
            className="grid flex-1 grid-cols-1 gap-10 xs:grid-cols-2 sm:grid-cols-4"
          >
            123
          </section>
          <section id="newsletter" aria-labelledby="newsletter-heading" className="space-y-3">
            <h4 className="text-base font-medium">123</h4>
          </section>
        </section>
        <section id="footer-bottom" aria-labelledby="footer-bottom-heading" className="flex items-center space-x-4">
          <div className="flex-1 text-left text-sm leading-loose text-muted-foreground">Built by 123</div>
          <div className="flex items-center space-x-1">
            <ThemeToggle />
          </div>
        </section>
      </Shell>
    </footer>
  );
}
