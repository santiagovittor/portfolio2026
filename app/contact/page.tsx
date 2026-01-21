// app/contact/page.tsx
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import ContactSection from "../../components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} — collaboration, opportunities, and freelance work.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactSection />;
}
