type QuoteBlockProps = {
  quote: string;
  attribution: string;
  frame?: string;
};

export function QuoteBlock({ quote, attribution, frame }: QuoteBlockProps) {
  return (
    <div className="quote-block">
      <blockquote>{quote}</blockquote>
      <p className="quote-block__attribution">{attribution}</p>
      {frame ? <p className="quote-block__frame">{frame}</p> : null}
      <p className="quote-block__small-print">
        Quotes are from public statements and are not endorsements of
        RunsOnItsOwn.ai.
      </p>
    </div>
  );
}
