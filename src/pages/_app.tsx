/* eslint-disable no-restricted-imports */
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import wrapper from "@/redux/store";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import "@/styles/globals.css";
import "@/styles/theme-colors.css";
import "@/components/Bread-crumb/breadcrumb.scss";
import "@/components/Pagination/pagination.scss";
import "@/components/Select-Menu/select-menu.scss";
import "@/components/cart/payment-method/payment-style.scss";
import "@/components/tabs/tabs-style.scss";
import "@/containers/faqs/faq.scss";
import "@/containers/categories-menu/categories-menu/categories-menu-item.scss";

import "@/styles/swiper.scss";
import "@/styles/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import HeaderDesktopSkeleton from "@/components/skeleton/header/HeaderDesktopSkeleton";
const AppIndex = dynamic(() => import("@/containers/app/app-index/app-index"));
const HeaderIndex = dynamic(
  () => import("@/containers/header/header-index/header-index"),
  { ssr: true, loading: () => <HeaderDesktopSkeleton /> }
);
const FooterIndex = dynamic(
  () => import("@/containers/footer/footer-index/footer-index")
);
import { getMessaging, onMessage, isSupported } from "firebase/messaging";
import firebaseApp from "@/utils/firebase";
import "regenerator-runtime/runtime";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { initMixpanel } from "../utils/mix-pnael";
import { LanguageProvider } from "@/language-context/LanguageContext";
import RTLWrapper from "@/rtl-wrapper/rtl-wrapper";
import SplashScreen from "@/components/splash-screen/splash-screen";

interface IProps extends AppProps {}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 600000,
    },
  },
});
NProgress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 500,
});

function MyApp({ Component, pageProps, ...rest }: IProps) {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const CANONICAL_DOMAIN = "https://";
  const [showSplash, setShowSplash] = useState(true);


  const _pathSliceLength = Math.min.apply(Math, [
    router.asPath.indexOf("?") > 0
      ? router.asPath.indexOf("?")
      : router.asPath.length,
    router.asPath.indexOf("#") > 0
      ? router.asPath.indexOf("#")
      : router.asPath.length,
  ]);
  const canonicalURL =
    CANONICAL_DOMAIN +
    router.asPath.substring(0, _pathSliceLength).toLowerCase();
  const { store } = wrapper.useWrappedStore(rest);
  initMixpanel();
  useEffect(() => {
    // Only show splash on the homepage
    if (router.pathname !== "/") {
      setShowSplash(false);
    }
    
    // Check if user has already seen the splash screen in this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, [router.pathname]);
  const handleSplashComplete = () => {
    setShowSplash(false);
    // Save to session storage so it doesn't show again in this session
    sessionStorage.setItem('hasSeenSplash', 'true');
  };
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done(false));

    return () => {
      Router.events.off("routeChangeStart", () => NProgress.start());
      Router.events.off("routeChangeComplete", () => NProgress.done(false));
    };
  }, [router]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    (async () => {
      try {
        const isSupported123 = await isSupported();
        if (isSupported123) {
          const messaging = getMessaging(firebaseApp);
          onMessage(messaging, (payload) => {
            const obj = {
              title: payload.notification?.title,
              body: payload.notification?.body,
              icon: "",
            };
            if ("Notification" in window) {
              // Display the notification
              if (Notification.permission === "granted") {
                obj?.title !== undefined &&
                  new Notification(obj?.title, {
                    body: obj?.body,
                    icon: obj?.icon,
                  });
              }
            }
          });
        }
      } catch {
        console.log(
          "Firebase Messaging is not supported in this browser or environment."
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (windowWidth !== 0) {
      if (
        (router?.pathname === "/voucher" ||
          router?.pathname === "/cart-2" ||
          router?.pathname === "/payment" ||
          router?.pathname === "/checkout") &&
        windowWidth > 575
      ) {
        router.push("/cart");
      } else if (router?.pathname === "/cart" && windowWidth < 576) {
        router.push("/cart-2");
      }
    }
  }, [windowWidth]);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" key="charSet" />
        <meta
          name="description"
          content="Buy authentic pharmaceutical & wellness products from Online Pharmacy & Medical Store Online or Find a Wevoca Store near you. Call us to order at 021-11-11-38246."
        />
        <title>
          Premier Online Pharmacy & Online Medical Store in Country - TEMP®
        </title>

        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.png" />
        {/* <meta
          name="facebook-domain-verification"
          content="57xgp6cqom9gw8cgcpr6jnt02osari"
        />
        <meta property="og:site_name" content="DVAGO®" /> */}
        {/* <meta property="og:url" content="https://dvago.pk/" /> */}
        <meta
          property="og:title"
          content="Premier Online Pharmacy &amp; Online Medical Store in Pakistan - Wevoca"
        />
        <meta property="og:type" content="website" />
        {/* <meta
          property="og:image"
          // content="https://dvago.pk/assets/dvago-logo.svg"
          content="https://dvago.pk/assets/favicon.png"
        /> */}
        {/* <meta
          property="og:image:secure_url"
          // content="https://dvago.pk/assets/dvago-logo.svg"
          content="https://dvago.pk/assets/favicon.png"
        /> */}
        {/* <meta
          name="google-site-verification"
          content="ZAYtjDJxW_kU3deKedYNCOFVtiyRgEecXE3atjPP2F0"
        /> */}
        <meta
          property="og:description"
          content="Buy authentic pharmaceutical &amp; wellness products from Online Pharmacy &amp; Medical Store Online or Find a Wevoca Store near you. Call us to order at ."
        />
        <meta
          name="twitter:title"
          content="Premier Online Pharmacy &amp; Online Medical Store in Pakistan - WeVoca"
        />
        <meta
          name="twitter:description"
          content="Buy authentic pharmaceutical &amp; wellness products from Online Pharmacy &amp; Medical Store Online or Find a Wevoca Store near you. Call us to order at ."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={canonicalURL} />
      </Head>
      <Provider store={store}>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <RTLWrapper>
                <HeaderIndex />
                <AppIndex>
                  <Component {...pageProps} />
                </AppIndex>
                <FooterIndex />
              </RTLWrapper>
            </Hydrate>
          </QueryClientProvider>
        </LanguageProvider>
        <ToastContainer limit={1} />
      </Provider>
    </>
  );
}

export default MyApp;
