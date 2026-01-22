import type { Metadata } from "next";
import AssistantChat from "@/components/AssistantChat";

export const metadata: Metadata = {
  title: "Assistant — Santiago Vittor",
  description:
    "Ask about my projects, stack, and decisions behind the work showcased in this portfolio.",
};

export default function AssistantPage() {
  return <AssistantChat />;
}
