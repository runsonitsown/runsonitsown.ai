import Image from "next/image";
import Link from "next/link";

export function BrandMark() {
  return (
    <Link className="brand-mark" href="/" aria-label="RunsOnItsOwn.ai home">
      <span className="brand-mark__crop">
        <Image
          alt="RunsOnItsOwn.ai"
          className="brand-mark__image"
          height={1254}
          priority
          src="/images/runsonitsown-logo.png"
          width={1254}
        />
      </span>
    </Link>
  );
}
