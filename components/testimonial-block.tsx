type TestimonialBlockProps = {
  context: string;
};

export function TestimonialBlock({ context }: TestimonialBlockProps) {
  return (
    <section aria-label={`${context} client result`} className="testimonial-block">
      <p>[TESTIMONIAL — TJ TO SUPPLY]</p>
    </section>
  );
}
