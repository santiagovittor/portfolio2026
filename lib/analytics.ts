// lib/analytics.ts
export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

function getPagePath() {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname + window.location.search;
}

/**
 * Fires a GA4 (gtag) event + Meta Pixel custom event when available.
 * Safe no-op when scripts/env vars are not present.
 */
export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const page_path = getPagePath();
  const payload = {
    page_path,
    ...params,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }

  // Meta Pixel: custom events for non-standard actions
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, payload);
  }
}

/**
 * Outbound clicks (social/email/repo). Useful for portfolio conversion tracking.
 */
export function trackOutboundClick(params: { url: string; label?: string; location?: string }) {
  trackEvent("outbound_click", {
    link_url: params.url,
    link_label: params.label,
    link_location: params.location,
  });
}

/**
 * Lead/conversion event for contact form submissions.
 * - GA4 recommended event: generate_lead
 * - Meta Pixel standard event: Lead
 */
export function trackLead(params: { method: "contact_form" | "mailto" | string; id?: string }) {
  if (typeof window === "undefined") return;

  const page_path = getPagePath();
  const payload = {
    page_path,
    method: params.method,
    lead_id: params.id,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", payload);
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", payload);
  }
}
