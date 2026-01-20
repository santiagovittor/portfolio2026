import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="px-6 py-10 text-center text-sm opacity-80">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js.
      </p>
    </footer>
  );
}
