/**
 * Renders one or more JSON-LD schema objects into a <script> tag.
 * Server component — no client JS shipped. Pass a single object or an array.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; we escape the closing tag sequence
      // to prevent early </script> termination.
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}
