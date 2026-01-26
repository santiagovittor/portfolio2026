"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function Analytics() {
  const pathname = usePathname();

  // GA4 Measurement ID (yours: G-E3R3NDZXZD)
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Meta Pixel ID is NUMERIC (optional). Example: 123456789012345
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // Don’t track in dev/preview unless you explicitly want to.
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) return null;

  // SPA page views on route change
  useEffect(() => {
    const pagePath = pathname + (typeof window !== "undefined" ? window.location.search : "");

    if (GA_ID && typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: pagePath });
    }

    if (META_PIXEL_ID && typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, GA_ID, META_PIXEL_ID]);

  return (
    <>
      {/* GA4 */}
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
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      ) : null}

      {/* Meta Pixel (optional) */}
      {META_PIXEL_ID ? (
        <>
          <Script id="meta-pixel-init" strategy="afterInteractive">
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
