/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";
import React, { useEffect, useState } from "react";
import style from "./feedback-index.module.scss";
import FeedbackForm from "@/components/Feedback-form/feedback-form";
import { Formik } from "formik";
import ComplaintForm from "@/components/Complaint-form/Complaint-form";
import RadioBtn from "@/components/radio-btn/radio-btn";
import PageWithBanner from "@/components/page-banner/page-with-banner";
import { getBranch } from "@/services/stores/services";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/store";
import { getComplaintType } from "@/services/complaint-feedback/services";
import Head from "next/head";

interface IProps {}
interface initialValuesProps {
  feedbackRadio: string;
}

const cateogryOption: { key: string; value: string; isDefault?: boolean }[] = [
  { key: `Feedback Form `, value: `Feedback`, isDefault: true },
  { key: `Complaint Form`, value: `Complaint` },
];

const FeedbackIndex: React.FC<IProps> = () => {
  const storeData = useSelector((state: StoreState) => state.store);
  const [data, setData] = useState<{ value: string; label: string }[]>([]);
  const [allBranch, setAllBranch] = useState<
    { id: number; value: string; label: string }[]
  >([]);
  const [selectedOptionVal, setSelectedOptionVal] = useState(
    cateogryOption.find((item) => item.isDefault) || cateogryOption[0]
  );

  const initialValue: initialValuesProps = {
    feedbackRadio: "",
  };

  useEffect(() => {
    const feedbacFunc = async (retryCount = 0) => {
      const response = await getBranch(storeData.selectedStoreCode, {
        token: "",
      });

      if (!response && retryCount < 3) {
        // Retry the API call after a delay
        setTimeout(() => {
          feedbacFunc(retryCount + 1);
        }, 1000); // Adjust the delay time as needed
        return;
      }

      if (response && response.ResponseType.toString() === "1") {
        const branches = [{ id: 0, value: "Online", label: "Online" }];
        response.Data.forEach((item, index) => {
          branches[index + 1] = {
            id: index + 1,
            value: item.Title,
            label: item.Title,
          };
        });
        setAllBranch(branches);
      }
    };

    feedbacFunc();
  }, []);

  useEffect(() => {
    const complaintFunc = async (retryCount = 0) => {
      const response = await getComplaintType({ token: "" });

      if (!response && retryCount < 3) {
        // Retry the API call after a delay
        setTimeout(() => {
          complaintFunc(retryCount + 1);
        }, 1000); // Adjust the delay time as needed
        return;
      }

      if (response && response.Data && response.Data.length > 0) {
        const compData: React.SetStateAction<
          { value: string; label: string }[]
        > = [];
        response.Data.forEach((item, index) => {
          compData[index] = { value: item.value, label: item.value };
        });
        setData(compData);
      }
    };

    complaintFunc();
  }, []);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="We value your feedback at WeVoca Online Pharmacy and Medical Store. Share your thoughts with us and help us improve our services. Whether you have a suggestion, complaint, or simply want to share your experience, we welcome all feedback. Leave your feedback now and help us serve you better."
        />
        {/* <title>Share Your Feedback on - DVAGO®</title> */}
        <title>Share Your Feedback on - TEMP®</title>
      </Head>
      <PageWithBanner removeSideSpacing={style.pageSpacing}>
        <BreadCrumb FourthLink="Feedback" classes="deal-breadcrumb" />

        <Formik initialValues={initialValue} onSubmit={() => {}}>
          {() => (
            <RadioBtn
              name="feedbackRadio"
              cateogryOption={cateogryOption}
              selectedOptionVal={selectedOptionVal}
              setSelectedOptionVal={setSelectedOptionVal}
            />
          )}
        </Formik>
        <div className={style.formWrapper}>
          {selectedOptionVal?.value === "Feedback" ? (
            <FeedbackForm />
          ) : (
            <ComplaintForm complaintTypes={data} allBranch={allBranch} />
          )}
        </div>
      </PageWithBanner>
    </>
  );
};

export default FeedbackIndex;
