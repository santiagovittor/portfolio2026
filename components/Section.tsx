export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-6 py-12 md:py-16 ${className}`.trim()}>
      {children}
    </section>
  );
}
