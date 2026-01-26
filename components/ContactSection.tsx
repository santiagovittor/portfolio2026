// components/ContactSection.tsx
"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useTheme } from "./ThemeProvider";
import SocialMedia from "./SocialMedia";
import { trackEvent, trackLead, trackOutboundClick } from "../lib/analytics";

type Values = {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot
};

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const { isDark } = useTheme();

  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  const [touched, setTouched] = useState<Record<keyof Values, boolean>>({
    name: false,
    email: false,
    message: false,
    website: false,
  });

  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState<string>("");
  const [messageId, setMessageId] = useState<string>("");

  const errors = useMemo(() => {
    const e: Partial<Record<keyof Omit<Values, "website">, string>> = {};

    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    if (!name) e.name = "Please enter your name.";
    else if (name.length < 2) e.name = "Name is too short.";
    else if (name.length > 80) e.name = "Name is too long (max 80).";

    if (!email) e.email = "Please enter your email.";
    else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email))
      e.email = "Please enter a valid email.";

    if (!message) e.message = "Please write your message.";
    else if (message.length < 10) e.message = "Message is too short (min 10).";
    else if (message.length > 2000) e.message = "Message is too long (max 2000).";

    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;
  const eachClass = isDark ? "inputContainer__each--isDark" : "inputContainer__each";

  const onChange =
    (key: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
    };

  const onBlur = (key: keyof Values) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, message: true, website: true });
    if (!isValid || status === "sending") return;

    setStatus("sending");
    setServerMsg("");
    setMessageId("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          website: values.website, // honeypot
        }),
      });

      const data = (await res.json().catch(() => ({}))) as any;

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setServerMsg(data?.error?.message || data?.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("sent");
      setMessageId(data?.id || "");
      setValues({ name: "", email: "", message: "", website: "" });

      // ✅ Conversion tracking
      const id = data?.id || "";
      trackLead({ method: "contact_form", id }); // GA: generate_lead, Pixel: Lead
      trackEvent("contact_submit", { id });      // extra event for reporting

      window.setTimeout(() => setStatus("idle"), 15000);
    } catch {
      setStatus("error");
      setServerMsg("Network error. Please try again.");
    }
  };

  // Button classes intentionally inverted (your note kept)
  const activeButtonClass = isDark ? "inputContainer__button" : "inputContainer__buttonIsDark";
  const disabledButtonClass = isDark
    ? "inputContainer__buttonIsDark--disabled"
    : "inputContainer__button--disabled";

  const canSend = isValid && status !== "sending";

  const emailAddress = "svittordev@gmail.com";
  const mailtoUrl = `mailto:${emailAddress}`;

  const onEmailClick = () => {
    trackEvent("contact_email_click", { location: "contact_fallback" });
    trackOutboundClick({ url: mailtoUrl, label: "Email", location: "contact_fallback" });
  };

  return (
    <div className={isDark ? "contactContainer__isDark" : "contactContainer"}>
      <div className="contactContainer__form">
        <h1>CONTACT</h1>
        <SocialMedia />

        <h4>Want to collaborate or just say hi? Send me a message and I’ll get back to you.</h4>

        <div className="inputContainer">
          <form onSubmit={onSubmit}>
            <div className="inputContainer__honeypot">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                value={values.website}
                onChange={onChange("website")}
                onBlur={onBlur("website")}
                type="text"
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            <div className={eachClass}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                value={values.name}
                onChange={onChange("name")}
                onBlur={onBlur("name")}
                type="text"
                autoComplete="name"
              />
            </div>
            {touched.name && errors.name ? (
              <div className="inputContainer__each--error">{errors.name}</div>
            ) : null}

            <div className={eachClass}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                value={values.email}
                onChange={onChange("email")}
                onBlur={onBlur("email")}
                type="email"
                autoComplete="email"
              />
            </div>
            {touched.email && errors.email ? (
              <div className="inputContainer__each--error">{errors.email}</div>
            ) : null}

            <div className={eachClass}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={values.message}
                onChange={onChange("message")}
                onBlur={onBlur("message")}
                maxLength={2000}
              />
            </div>
            {touched.message && errors.message ? (
              <div className="inputContainer__each--error">{errors.message}</div>
            ) : null}

            <button
              className={canSend ? activeButtonClass : disabledButtonClass}
              type="submit"
              disabled={!canSend}
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>

            {status === "sent" ? (
              <div className="inputContainer__successAlert">
                Thanks — message sent{messageId ? ` (id: ${messageId})` : ""}.
              </div>
            ) : null}

            {status === "error" ? (
              <div className="inputContainer__errorAlert">{serverMsg}</div>
            ) : null}

            <div className="inputContainer__fallback">
              Or email me directly:{" "}
              <a href={mailtoUrl} onClick={onEmailClick}>
                {emailAddress}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
