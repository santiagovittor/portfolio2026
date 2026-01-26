// components/Analytics.tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

/**
 * Loads common marketing trackers:
 * - Google Analytics 4 (gtag)
 * - Meta Pixel (optional)
 *
 * Notes:
 * - Runs only in production by default (avoids polluting dev/preview).
 * - Tracks SPA route changes as page views.
 */
export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  const isProd = process.env.NODE_ENV === "production";
  const didInit = useRef(false);

  if (!isProd) return null;

  // SPA page views on route changes (skip the first run; GA/Pixel handle initial load)
  useEffect(() => {
    if (!didInit.current) {
      didInit.current = true;
      return;
    }

    const qs = searchParams?.toString();
    const pagePath = pathname + (qs ? `?${qs}` : "");

    if (GA_ID && typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: pagePath });
    }

    if (META_PIXEL_ID && typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams, GA_ID, META_PIXEL_ID]);

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              // send_page_view=true (default) so the first load is counted.
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      ) : null}

      {/* Meta Pixel (optional) */}
      {META_PIXEL_ID ? (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>

          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      ) : null}
    </>
  );
}
