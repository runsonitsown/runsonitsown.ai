import Link from "next/link";

export function IncomeDisclaimer() {
  return (
    <aside className="income-disclaimer" aria-label="Results disclaimer">
      <div className="shell">
        Results are not typical or guaranteed. Individual results vary. Nothing
        on this site is financial advice. <Link href="/disclaimer">Read the full disclaimer.</Link>
      </div>
    </aside>
  );
}
