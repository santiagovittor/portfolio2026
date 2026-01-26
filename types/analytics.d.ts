// types/analytics.d.ts
export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: any[]) => void;

    fbq?: (...args: any[]) => void;
    _fbq?: unknown;
  }
}
