type Props = { data: Record<string, unknown> | Record<string, unknown>[] };

/** Renders structured data. `<` is escaped so user text can never break out of the script tag. */
export function JsonLd({ data }: Props) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
