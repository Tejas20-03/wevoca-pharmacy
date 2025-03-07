import React from "react";
import style from "./home-categories.module.scss";
import { GetBannersNew_DetailDataType } from "@/services/banners/types";
import Image from "next/image";
import { handleBannersRoute } from "@/containers/home/home-banners/home-banners";
import { Box, Container } from "@mui/material";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/language-context/LanguageContext";
const HomeSectionTitle = dynamic(
  () => import("@/containers/home/common/home-section-title/home-section-title")
);

interface IProps {
  sectionTitle: string;
  data: GetBannersNew_DetailDataType[];
}

const HomeMobileCategory: React.FC<IProps> = ({ sectionTitle, data }) => {
  const { language } = useLanguage();
  return (
    <Container className={style.mainContainer}>
      <div className={style.container}>
        <Box className={style.titleContainer}>
          <HomeSectionTitle title={sectionTitle} />
        </Box>
        <div className={style.grid}>
          {data.map((item, index) => (
            <div key={index} className={style.gridItemWrapper}>
              <Link href={handleBannersRoute(item)}></Link>
              <div className={style.gridItem}>
                <div
                  className={style.gridItemImageContainer}
                  style={{ position: "relative" }}
                >
                  <Image
                    priority={true}
                    quality={100}
                    fill
                    className={style.gridItemImage}
                    src={item.BannerImageNew}
                    alt={item.Text}
                    sizes="(min-width: 1000px) 136px, (min-width: 580px) 136px, (min-width: 560px) 136px, (min-width: 540px) 136px, (min-width: 520px) 136px, (min-width: 500px) 136px, (min-width: 480px) 136px, (min-width: 460px) 117px, (min-width: 440px) 117px, (min-width: 420px) 117px, (min-width: 400px) 117px, (min-width: 380px) 117px, (min-width: 360px) 117px, (min-width: 340px) 117px, (min-width: 320px) 117px, 117px"
                  />
                </div>
                <h3 className={style.gridItemText}>
                  {language === "en" ? item.Text : item.TitleArabic}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HomeMobileCategory;
