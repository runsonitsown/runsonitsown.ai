import Link from "next/link";
import { primaryNavigation } from "@/config/site";
import { BrandMark } from "@/components/brand-mark";

const legalNavigation = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <BrandMark />
        <nav className="site-footer__links" aria-label="Footer navigation">
          {primaryNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="site-footer__legal" aria-label="Legal navigation">
          {legalNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
