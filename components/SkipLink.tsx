export default function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-brand-dark dark:focus:bg-brand-dark dark:focus:text-white"
    >
      Skip to content
    </a>
  );
}
