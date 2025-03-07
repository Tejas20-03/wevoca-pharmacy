import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import ArrowRight from "@/containers/svg-icons/arrow-right";
import { CategoryHierarchy } from "@/services/product/types";
import { toSentenceCase } from "@/functions/toSentanceCase";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {
  classes?: String;
  firstTitle?: String;
  secondTitle?: String;
  thirdTitle?: string;
  thirdLink?: string;
  FourthLink?: String;
  secondLink?: string;
  categoryHierarhcy?: CategoryHierarchy[] | undefined;
}

const BreadCrumb: React.FC<IProps> = ({
  classes,
  firstTitle = "Home",
  secondTitle,
  secondLink,
  thirdTitle,
  thirdLink,
  FourthLink,
  categoryHierarhcy,
}) => {
  const classBasedOnLength = `${secondTitle?.length ? "threeItems" : ""}`;
  const importedClass = `${classes?.length ? classes : ""}`;
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
    <div
      className={`product-breadcrumb ${importedClass} ${classBasedOnLength}`}
    >
      <Breadcrumbs separator=" " aria-label="breadcrumb">
        {firstTitle?.length && (
          <Link href={{ pathname: "/" }} prefetch={false}>
            {getText("Home")}
          </Link>
        )}
        <ArrowRight color="var(--text-color)" />
        {secondTitle?.length && (
          <Link href={{ pathname: `${secondLink}` }} prefetch={false}>
            {toSentenceCase(secondTitle.toString())}
          </Link>
        )}
        {secondTitle?.length && <ArrowRight color="var(--text-color)" />}
        {thirdTitle?.length && (
          <Link href={{ pathname: `${thirdLink}` }} prefetch={false}>
            {toSentenceCase(thirdTitle.toString())}
          </Link>
        )}
        {thirdTitle?.length && <ArrowRight color="var(--text-color)" />}
        {categoryHierarhcy !== undefined &&
          categoryHierarhcy?.length > 1 &&
          categoryHierarhcy?.slice(0, -1)?.map((item, index) => (
            <React.Fragment key={index}>
              <Link href={{ pathname: item.Slug }} prefetch={false}>
                {toSentenceCase(item.Name.toString())}
              </Link>
              <ArrowRight color="var(--text-color)" />
            </React.Fragment>
          ))}
        {FourthLink?.length && <Typography>{FourthLink}</Typography>}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumb;
