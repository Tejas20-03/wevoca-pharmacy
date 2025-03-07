import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export default function Document(props) {
  const productDetail =
    props?.__NEXT_DATA__?.props?.pageProps?.productDetailJson?.Data?.[0];
  const blogDetail =
    props?.__NEXT_DATA__?.props?.pageProps?.blogDetailData?.[0];
  return (
    <Html lang="en">
      <Head>
        {/* <Script strategy="beforeInteractive" async src="https://www.googletagmanager.com/gtag/js?id=G-1709Q92LZR" /> */}

        {/* <Script strategy="beforeInteractive" id="_webengage_script_tag" type="text/javascript">
          {`
         var webengage;
         ! function(w, e, b, n, g) {
             function o(e, t) {
                 e[t[t.length - 1]] = function() {
                     r.__queue.push([t.join("."), arguments])
                 }
             }
             var i, s, r = w[b],
                 z = " ",
                 l = "init options track screen onReady".split(z),
                 a = "feedback survey notification".split(z),
                 c = "options render clear abort".split(z),
                 p = "Open Close Submit Complete View Click".split(z),
                 u = "identify login logout setAttribute".split(z);
             if (!r || !r.__v) {
                 for (w[b] = r = {
                         __queue: [],
                         is_spa: 1, //Change this to 0 if you do not wish to use default SPA behaviour of WebEngage SDK
                         __v: "6.0",
                         user: {}
                     }, i = 0; i < l.length; i++) o(r, [l[i]]);
                 for (i = 0; i < a.length; i++) {
                     for (r[a[i]] = {}, s = 0; s < c.length; s++) o(r[a[i]], [a[i], c[s]]);
                     for (s = 0; s < p.length; s++) o(r[a[i]], [a[i], "on" + p[s]])
                 }
                 for (i = 0; i < u.length; i++) o(r.user, ["user", u[i]]);
                 setTimeout(function() {
                     var f = e.createElement("script"),
                         d = e.getElementById("_webengage_script_tag");
                     f.type = "text/javascript", f.async = !0, f.src = ("https:" == e.location.protocol ? "https://ssl.widgets.webengage.com" : "http://cdn.widgets.webengage.com") + "/js/webengage-min-v-6.0.js", d.parentNode.insertBefore(f, d)
                 })
             }
         }(window, document, "webengage");
         webengage.init('d3a4ab42'); 
          `}
        </Script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <Script strategy="afterInteractive" async id="Blog-Schema-markup" type="application/ld+json">
          {`
          {
            "@context": "http://schema.org",
            "@type": "Article",
            "name": "${blogDetail?.Title}",
            "image": "${blogDetail?.ImageURL}",
            "articleSection": "Blogs"
          }
          `}
        </Script> */}
        {/* <Script strategy="afterInteractive" async id="Product-Schema-markup" type="application/ld+json">
          {`
          {
            "@context": "http://schema.org",
            "@type": "Product",
            "name": "${productDetail?.Title}",
            "image": "${productDetail?.ProductImage}",
            "description": "${productDetail?.Description}",
            "url": "https://www.dvago.pk/p/${productDetail?.Slug}",
            "brand": {
              "@type": "Brand",
              "name": "${productDetail?.Brand}"
            },
            "offers": {
              "@type": "Offer",
              "price": "${productDetail?.DiscountPrice !== '0' ? productDetail?.DiscountPrice : productDetail?.SalePrice}"
            }
          }
          `}
        </Script> */}
        {/* Google Tag Manager */}
        {/* live GTM-54J5G42 */}
        {/* Staging GTM-NSCF3K43 */}
        {/* <Script strategy="beforeInteractive" id="google-analytics-gtm" async>
          {`
            (function(w,d,s,l,i){w[l] = w[l] || [];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-54J5G42');
          `}
        </Script> */}

        {/* Google Analytics Configuration */}
        {/* <Script strategy="beforeInteractive" id="google-analytics" async>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1709Q92LZR');
          `}
        </Script> */}

        {/* Facebook Pixel */}
        {/* <Script strategy="afterInteractive" id="facebook-pixel" defer>
          {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=true;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '459899648486938');
              fbq('track', 'PageView');
            `}
        </Script> */}

        {/* live GTM-54J5G42 */}
        {/* Staging GTM-NSCF3K43 */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-54J5G42"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript> */}

        {/* <noscript>
          <img
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=765216191635909&ev=PageView&noscript=1"
          />
        </noscript> */}
      </body>
    </Html>
  );
}
