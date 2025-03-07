import React from "react";
import HomeSectionTitle from "@/containers/home/common/home-section-title/home-section-title";
import Image from "next/image";
import { MdCloudUpload } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { BsFillDoorOpenFill } from "react-icons/bs";
import style from "./home-prescription.module.scss";
import Link from "next/link";
import { Container } from "@mui/system";
import { useLanguage } from "@/language-context/LanguageContext";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

interface IProps {}

const HomePrescription: React.FC<IProps> = () => {
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
    <div className={style.container}>
      <Container>
        <HomeSectionTitle
          className={style.title}
          title={getText("Upload-Prescription")}
        />
        <div className={style.contentContainer}>
          <div className={style.imgContainer}>
            <Image
              fill
              objectFit="cover"
              src={"/assets/home-prescription-image.png"}
              alt="Prescription uploading image"
            />
          </div>
          <div className={style.content}>
            <h3 className={style.contentTitle}>
              {getText("Upload-prescription-Desc")}
            </h3>
            <div className={style.contentIcons}>
              <div className={style.iconContainer}>
                <MdCloudUpload className={style.icon} />
                <p className={style.iconText}>
                  {getText("Upload-Prescription")}
                </p>
              </div>
              <div className={style.iconContainer}>
                <FaBell className={style.icon} />
                <p className={style.iconText}>
                  {getText("Received-Notification")}
                </p>
              </div>
              <div className={style.iconContainer}>
                <BsFillDoorOpenFill className={style.icon} />
                <p className={style.iconText}>{getText("Doorstep-Delivery")}</p>
              </div>
            </div>
            <Link
              prefetch={false}
              className={style.contentBtn}
              href={{ pathname: "/prescription" }}
            >
              Upload
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePrescription;
