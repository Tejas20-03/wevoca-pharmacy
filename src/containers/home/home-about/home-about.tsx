import { Box, Container, Typography } from "@mui/material";

import React, { useState } from "react";
import style from "./home-about.module.scss";
import { useAppSelector } from "@/hooks/use-app-selector";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/language-context/LanguageContext";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import Buttons from "@/components/Button/Buttons";
const HomeSectionTitle = dynamic(
  () => import("@/containers/home/common/home-section-title/home-section-title")
);

const HomeAbout: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const storeData = useAppSelector((state) => state.store);
  const { language } = useLanguage();

  const { data: translatedData } = useQuery(
    ["complain-form"],
    async () => {
      return await GetTranslatedData({ token: "" });
    },
    {
      retry: (failureCount, error) => {
        const token = Cookies.get("auth-token");
        return !token;
      },
      retryDelay: 0,
      staleTime: 600000,
    }
  );

  const getText = (value: string) => {
    const translatedItems = translatedData?.Data || [];
    const item = translatedItems.find((item: any) => item.Value === value);
    return language === "ar" ? item?.Arabic : item?.English;
  };
  return (
    <>
      <Container className={style.mainContainer}>
        <Box className={style.titleContainer}>
          <div
            className={`${style.content} ${
              showMore ? style.contentShowFull : ""
            }`}
          >
            <HomeSectionTitle
              tag="h1"
              className={style.aboutHeading}
              color="var(--bg-color)"
              //   title="DVAGO - Pakistan’s Best Online Pharmacy & Medical Store"
              title="WEVOCA - Country's Best Online Pharmacy & Medical Store"
            />
            <Typography>
              Our primary goal, being Country's best and trusted pharmacy and
              healthcare platform, is to proffer the facility of online{" "}
              <Link href="/cat/medicine">buying medicines</Link>, and{" "}
              <Link href="/cat/health-care">health products</Link> from
              different parts of the country without any barriers. Now you don’t
              need to walk around the supermart or buy medicine by queueing up
              to vendors again. You can buy your pharmaceuticals, healthcare,
              and consumer care items online through our user-friendly Website
              or TEMP App from the comfort of your home with up to 15% discount
              and FREE delivery* (on order value above KWD
              {storeData.selectedStoreDeliveryChargesWaiveAfter}).
            </Typography>
            <Typography>
              TEMP has an integrated list of all prescriptions along with OTC
              products of all known brands and generic medicines which are
              original and proven to be reliable, health and{" "}
              <Link href="/cat/herbal">herbal goods</Link>,{" "}
              <Link href="/cat/kids-supplements">children’s vitamins</Link>,{" "}
              <Link href="/cat/baby-diapers-wipes">diapers</Link>,{" "}
              <Link href="/cat/baby-food-milk">milk powder</Link>, and{" "}
              <Link href="/cat/nutritions-supplements">
                nutritional supplements
              </Link>
              . Customers today can reach out to the shop through a variety of
              channels: an extensive product catalog, comparison of prices, and
              online shopping, with just a few clicks. The providers make sure
              that the products that customers access are real and are directly
              sourced from manufacturers who have already been vetted and
              recognized, this is to ensure that the platform has no counterfeit
              products.
            </Typography>
            <h2>Buy Medicine Online at TEMP </h2>
            <Typography>
              At TEMP you can buy both prescribed & OTC medicines and
              multivitamins. For prescribed medicine, you need to upload your
              medical prescription. <Link href="/prescription">Click here</Link>{" "}
              on how to upload your medical prescription and place your online
              medicines order. For{" "}
              <Link href="/cat/otc-medicine">OTC medication</Link>, you can
              simply purchase from our online pharmacy or retail store without a
              prescription.
            </Typography>
            <h2>TEMP will Deliver Your Essentials Every Month!</h2>
            <Typography>
              We know It’s not easy to remember the refill of medicines you need
              monthly. TEMP's monthly refill service ensures to timely remind
              you about these refills so you will never out on your medical
              essentials & supplies. With our service, you will get monthly
              reminders and your order will be delivered at your convenience!
            </Typography>
            <h2>It is Safe and Secure</h2>
            <Typography>
              We prioritize customer safety and privacy. TEMP follows strict
              protocols to ensure secure transactions and protects the
              confidentiality of user information. The platform also emphasizes
              adherence to applicable healthcare regulations and standards. We
              make sure that controlled medicines are not dispensed out without
              any prescription.
            </Typography>
            <h2>Save Money on Medicine with Discounts</h2>
            <Typography>
              Along with our commitment to customer care and convenience, At
              TEMP, we also care about your affordability and financial comfort.
              This is the reason, we are offering up to 15% off on medicines.
              For your convenience, we offer multiple consumer promotions on
              non-pharma products, so that you can have reasons to shop from
              TEMP.
            </Typography>
            {/* <h2>Top Selling Medicines & Products</h2>
                        <ul>
                            <li><strong>
                                <Link href="/cat/otc-medicine">Pain Killers:</Link> </strong>
                                <Link href="/p/panadol-500mg-tablets">Panadol 500 mg, </Link>
                                <Link href="/p/disprin-tablets-disp-300-mg-100s">Disprin 300 mg, </Link>
                                <Link href="/p/voltral-emulgel-1-20gm">Voltral Emulgel 20g, </Link>
                                <Link href="/p/wintogeno-balm-50g">Wintogeno Balm 50g, </Link>
                                <Link href="/p/brufen-200-mg-200-mg-tablets">Brufen 200 Mg</Link>
                            </li>
                            <li><strong>
                                <Link href="/cat/acidity-indigestion">Acidity & Indigestion:</Link> </strong>
                                <Link href="/p/eno-sachets-12s-pack-regular">ENO Sachet, </Link>
                                <Link href="/p/hashmi-ispaghol-25g">Hashmi Ispaghol, </Link>
                                <Link href="/p/gaviscon-liquid-120-ml">Gaviscon Syrup, </Link>
                                <Link href="/p/digas-colic-20ml-drops-1s">Digas Drops, </Link>
                                <Link href="/p/citro-soda-orange-5g-sach-20s">Citro-Soda</Link>
                            </li>
                            <li><strong>
                                <Link href="/cat/nutritions-supplements">Calcium & Multi-vitamins:</Link>  </strong>
                                <Link href="/p/surbex-z-tablets-30s">Surbex Z Tablets, </Link>
                                <Link href="/p/cac-1000-plus-tablets-orange-10s">Cac 1000 Plus, </Link>
                                <Link href="/p/ensure-powder-chocolate-400g">Ensure Milk Powder 400gm, </Link>
                                <Link href="/p/glucerna-powder-vanilla-400g">Glucerna Powder 400g, </Link>

                                <Link href="/p/imuzer-chewable-300-mg-tablets">Imuzer Vitamin C</Link>
                            </li>

                            <li><strong>
                                <Link href="/cat/sexual-wellness">Sexual Wellness Products:</Link> </strong>
                                <Link href="/cat/condoms">Condoms, </Link>
                                <Link href="/search?search=durex">Durex, </Link>
                                <Link href="/search?search=josh">Josh, </Link>
                                <Link href="/search?search=pulse">Pulse, </Link>
                                <Link href="/cat/pregnancy-test-strips">Pregnancy test strip</Link>
                            </li>

                            <li><strong>
                                <Link href="/cat/personal-care">Personal Care Products:</Link> </strong>
                                <Link href="/p/skin-aqua-clear-white-spf50">Skin Aqua Clear White Spf50</Link>
                            </li>

                            <li><strong>
                                Top Brands: </strong>
                                <Link href="/search?search=Always">Always, </Link>
                                <Link href="/search?search=durex">Durex, </Link>
                                <Link href="/search?search=abbott">Abbot, </Link>
                                <Link href="/search?search=pepsi">Pepsi</Link>
                            </li>
                        </ul> */}
          </div>
          <div
            className={` ${style.SeeMoreBtn} ${
              showMore ? style.SeeMoreBtnOpened : ""
            }`}
          >
            <Buttons
              btnClickFunction={() => setShowMore(!showMore)}
              btnClass="secondary-font"
            >
              {!showMore ? getText("Show-More") : getText("Show-Less")}
            </Buttons>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default HomeAbout;
