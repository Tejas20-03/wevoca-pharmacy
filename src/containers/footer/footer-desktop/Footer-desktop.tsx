import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import style from "./Footer-desktop.module.scss";

import SocialIconIndex from "@/components/social-icons-index/social-icon-index";
import { ChatIndex } from "@/components/chat-index/chat-index";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
import { useLanguage } from "@/language-context/LanguageContext";
import HomeSectionTitle from "@/containers/home/common/home-section-title/home-section-title";

interface IProps {
  handleOrders: () => void;
  handleAccount: () => void;
}

const FooterDesktop: React.FC<IProps> = ({ handleOrders, handleAccount }) => {
  const date = new Date().getFullYear();
  const { isLoading, error, data, refetch } = useQuery(
    ["footer"],
    async () => {
      return await GetTranslatedData({ token: "" });
    },
    {
      retry: (failureCount, error) => {
        const token = Cookies.get("auth-token");
        return !token;
      },
      retryDelay: 0,
      staleTime: 600000, //1 day
    }
  );

  const footerData = data?.Data || [];

  const { language } = useLanguage();

  const getText = (value: string) => {
    const item = footerData.find((item: any) => item.Value === value);
    return language === "ar" ? item?.Arabic : item?.English;
  };

  return (
    <footer className={style.footer}>
      
      <div className={style.mainFooter}>
        <Container>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={3} sm={6} md={3} lg={2}>
              <Typography variant="h6">{getText("Categories")}</Typography>
              <Link href="/cat/medicine" className={style.Links}>
                {getText("Medicine")}
              </Link>
              <Link href="/atozmedicine/A" className={style.Links}>
                A to Z Medicine
              </Link>
              <Link href="/cat/baby-mother-care" className={style.Links}>
                Baby & Mother Care
              </Link>
              <Link href="/cat/nutritions-supplements" className={style.Links}>
                Nutrition & Supplements
              </Link>
              <Link href="/cat/foods-and-beverages" className={style.Links}>
                Food & Beverage
              </Link>
              <Link href="/cat/devices" className={style.Links}>
                Devices & Appliances
              </Link>
              <Link href="/cat/personal-care" className={style.Links}>
                Personal Care
              </Link>
              <Link href="/cat/otc-medicine" className={style.Links}>
                OTC And Health Need
              </Link>
            </Grid>
            <Grid item xs={3} sm={4} md={2} lg={2}>
              <Typography variant="h6">{getText("Navigate")}</Typography>
              <Link prefetch={false} href="/feedback" className={style.Links}>
                {getText("Feedback")}
              </Link>
              <Link prefetch={false} href="/prescription" className={style.Links}>
                {getText("Instant-Order")}
              </Link>
              <Link prefetch={false} href="/deals" className={style.Links}>
                {getText("Deals")}
              </Link>
              <Link prefetch={false} href="/stores" className={style.Links}>
                {getText("Stores")}
              </Link>
              <Link
                prefetch={false}
                href={{ pathname: `` }}
                onClick={handleOrders}
                className={style.Links}
              >
                {getText("My-Orders")}
              </Link>
              <Link
                prefetch={false}
                href={{ pathname: `` }}
                onClick={handleAccount}
                className={style.Links}
              >
                {getText("User-Profile")}
              </Link>
              <Link prefetch={false} href="/brands" className={style.Links}>
                {getText("Brands")}
              </Link>
              <Link prefetch={false} href="/blogs" className={style.Links}>
                {getText("Blogs")}
              </Link>
            </Grid>
            <Grid item xs={3} sm={4} md={3} lg={2}>
              <Typography variant="h6">{getText("Support")}</Typography>
              <Link
                prefetch={false}
                href="/faqs"
                className={`faq ${style.Links}`}
              >
                {getText("FAQs")}
              </Link>
              <Link
                prefetch={false}
                href="/policies/terms-and-conditions"
                className={`terms ${style.Links}`}
              >
                {getText("Terms-Of-Service")}
              </Link>
              <Link
                prefetch={false}
                href="/policies/shipping-policy"
                className={`shipping ${style.Links}`}
              >
                {getText("Shipping-Policy")}
              </Link>
              <Link
                prefetch={false}
                href="/policies/return-policy"
                className={`return ${style.Links}`}
              >
                {getText("Return-Policy")}
              </Link>
              <Link
                prefetch={false}
                href="/policies/refund-policy"
                className={`refund ${style.Links}`}
              >
                {getText("Refund-Policy")}
              </Link>
              <Link
                prefetch={false}
                href="/policies/privacy-policy"
                className={`policy ${style.Links}`}
              >
                {getText("Privacy-Policy")}
              </Link>
              <Link
                prefetch={false}
                target="_blank"
                href="/"
                className={`policy ${style.Links}`}
              >
                {getText("Careers")}
              </Link>
            </Grid>
            <Grid item xs={3} sm={4} md={3} lg={3}>
              <Typography variant="h6">{getText("Contact Us")}</Typography>
              <Typography sx={{ mt: 1 }} paragraph={true}>
                123, Street Name, City Name, Country
                <br />
                <br />
                <strong>{getText("Phone")}:</strong>{" "}
                <a href="/">(012) 45 67 TEMP (01234)</a>
                <br />
                <br />
                <strong>{getText("Email-address")}:</strong>{" "}
                <a href="mailto:feedback@temp.pk"> feedback@temp.pk</a>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={style.topFooter}>
        <Container>
          <div className={style.topFooterContent}>
            <div className={style.logoSection}>
              <Link href={"/"}>
                <Image
                  className={style.footerLogo}
                  src="/assets/favicon.png"
                  alt="footer logo"
                  width={160}
                  height={90}
                />
              </Link>
              <Typography sx={{ mt: 1 }} paragraph={true}>
                {getText("Countrys-most-trusted-pharmacy")}
              </Typography>
            </div>
            <Box className={style.SocialList}>
              <Typography>{getText("Follow-us")}</Typography>
              <SocialIconIndex />
            </Box>
          </div>
        </Container>
      </div>
      {/* <div className={style.bottomFooter}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>© {date} WEVOCA. Design</p>
          </Box>
        </Container>
      </div> */}
    </footer>
  );
};

export default FooterDesktop;
