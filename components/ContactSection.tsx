"use client";

import { useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { FiGithub, FiLinkedin, FiFacebook, FiMail, FiPhone } from "react-icons/fi";
import { siteConfig } from "@/lib/site";

type FormValues = { name: string; email: string; phone: string; message: string };

export default function ContactSection() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.name || !values.email || !values.message) {
      alert("Please fill out all required fields.");
      return;
    }
    // Replace this with a real action (Formspree, server action, Firebase, etc.)
    console.log("Contact form:", values);

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 12000);
    setValues({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <Section className="min-h-[100vh] grid place-items-center">
      <div className="w-full max-w-2xl">
        <Reveal>
          <h1 className="text-5xl font-bold uppercase text-center mb-8">Contact</h1>
        </Reveal>

        <Reveal>
          <div className="flex justify-center gap-8 text-3xl mb-10">
            <a href={siteConfig.socials.github} aria-label="GitHub" target="_blank" rel="noreferrer">
              <FiGithub className="hover:scale-110 transition-transform" />
            </a>
            <a href={siteConfig.socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <FiLinkedin className="hover:scale-110 transition-transform" />
            </a>
            <a href={siteConfig.socials.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
              <FiFacebook className="hover:scale-110 transition-transform" />
            </a>
            <a href={`mailto:${siteConfig.email}`} aria-label="Email">
              <FiMail className="hover:scale-110 transition-transform" />
            </a>
            <a href="tel:+10000000000" aria-label="Phone">
              <FiPhone className="hover:scale-110 transition-transform" />
            </a>
          </div>
        </Reveal>

        <form onSubmit={onSubmit} className="grid gap-8">
          <Reveal>
            <div className="grid gap-2">
              <label htmlFor="name" className="uppercase text-sm font-semibold">
                Name*
              </label>
              <input
                id="name"
                name="name"
                value={values.name}
                onChange={onChange}
                className="bg-transparent border-b-2 border-gray-400 dark:border-gray-500 py-2 outline-none focus:border-brand-dark dark:focus:border-white transition-colors duration-300"
                placeholder="Your name"
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="grid gap-2">
              <label htmlFor="email" className="uppercase text-sm font-semibold">
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={onChange}
                className="bg-transparent border-b-2 border-gray-400 dark:border-gray-500 py-2 outline-none focus:border-brand-dark dark:focus:border-white transition-colors duration-300"
                placeholder="you@example.com"
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="grid gap-2">
              <label htmlFor="phone" className="uppercase text-sm font-semibold">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                value={values.phone}
                onChange={onChange}
                className="bg-transparent border-b-2 border-gray-400 dark:border-gray-500 py-2 outline-none focus:border-brand-dark dark:focus:border-white transition-colors duration-300"
                placeholder="+1 555 555 5555"
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="grid gap-2">
              <label htmlFor="message" className="uppercase text-sm font-semibold">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={200}
                value={values.message}
                onChange={onChange}
                className="bg-transparent border-b-2 border-gray-400 dark:border-gray-500 py-2 outline-none focus:border-brand-dark dark:focus:border-white transition-colors duration-300 resize-none"
                placeholder="How can I help?"
              />
            </div>
          </Reveal>

          <Reveal>
            <button
              type="submit"
              className="rounded-md py-3 font-semibold transition-colors duration-[2000ms] bg-brand-dark text-white hover:bg-white hover:text-brand-dark dark:bg-white dark:text-brand-dark dark:hover:bg-brand-dark dark:hover:text-white"
            >
              Send Message
            </button>
          </Reveal>

          {submitted && (
            <p className="text-center text-green-600 dark:text-green-400">
              Your message was sent successfully!
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
