import type { Metadata } from "next";
import AssistantChat from "@/components/AssistantChat";

export const metadata: Metadata = {
  title: "Assistant",
  description:
    "Ask about my projects, stack, and decisions behind the work showcased in this portfolio.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/assistant",
  },
};

export default function AssistantPage() {
  return <AssistantChat />;
}
