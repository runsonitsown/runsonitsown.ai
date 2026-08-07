import Link from "next/link";
import { primaryNavigation } from "@/config/site";
import { BrandMark } from "@/components/brand-mark";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {primaryNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {primaryNavigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
