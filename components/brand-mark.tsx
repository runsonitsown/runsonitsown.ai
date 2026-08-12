import Link from "next/link";

export function BrandMark() {
  return (
    <Link className="brand-mark" href="/" aria-label="RunsOnItsOwn.ai home">
      <span aria-hidden="true" className="brand-mark__crop">
        <span className="brand-mark__glyph" />
        <span className="brand-mark__word">RunsOnItsOwn.ai</span>
      </span>
    </Link>
  );
}
