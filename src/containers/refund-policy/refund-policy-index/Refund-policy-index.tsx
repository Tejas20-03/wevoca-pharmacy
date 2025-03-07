import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";
import PageWithBanner from "@/components/page-banner/page-with-banner";
import BoxTitle from "@/components/BoxTitle/Box-title";
import style from "./Refund-policy-index.module.scss";
import { getRefundPolicy } from "@/services/policies/services";
import { GetPrivacies_ResponseDataType } from "@/services/policies/types";
import SectionLoader from "@/components/Section-loader/section-loader";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {}

const RefundPolicyIndex: React.FC<IProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [refundPolicy, setRefundPolicy] = useState(
    [] as GetPrivacies_ResponseDataType | undefined
  );

  useEffect(() => {
    const refundFunc = async () => {
      setLoading(true);

      const refundApi = await getRefundPolicy({ token: "" });
      setRefundPolicy(refundApi);
      setLoading(false);
    };
    refundFunc();
  }, []);

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
    <PageWithBanner removeSideSpacing={style.pageSpacing}>
      <BreadCrumb FourthLink={getText("Refund-Policy")} classes="deal-breadcrumb" />
      {loading && <SectionLoader />}
      {!loading && (
        <Box className={style.policyBox}>
          {refundPolicy &&
            refundPolicy?.length > 0 &&
            refundPolicy?.map((item, index) => (
              <div key={index}>
                <BoxTitle boxTitle={item.title} />
                {item.content && (
                  <Typography
                    variant="body2"
                    component="div"
                    dangerouslySetInnerHTML={{ __html: `${item.content}` }}
                  ></Typography>
                )}
              </div>
            ))}
        </Box>
      )}
    </PageWithBanner>
  );
};

export default RefundPolicyIndex;
