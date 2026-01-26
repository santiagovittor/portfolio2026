"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // Marketing-agent default: only track in production
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) return null;

  // Fire PageViews on route changes (App Router)
  useEffect(() => {
    const qs = searchParams?.toString();
    const url = pathname + (qs ? `?${qs}` : "");

    if (GA_ID && typeof window !== "undefined" && window.gtag) {
      // Send explicit SPA page_view (avoids double counting when send_page_view:false)
      window.gtag("event", "page_view", { page_path: url });
    }

    if (PIXEL_ID && typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams, GA_ID, PIXEL_ID]);

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
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      ) : null}

      {/* Meta / Facebook Pixel */}
      {PIXEL_ID ? (
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
              fbq('init', '${PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>

          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      ) : null}
    </>
  );
}
