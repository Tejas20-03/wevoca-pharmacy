import React from "react";
import style from "./speech-screen.module.scss";
import CloseIcon from "@/containers/svg-icons/close-icon";
import { StyledInputBase } from "@/components/Search/Search-mui-style";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {
  resetTranscript: () => void;
  transcript: string;
}

const SpeechScreen: React.FC<IProps> = ({ transcript, resetTranscript }) => {
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
    <div className="pulseBox">
      <div className="pulseWrapper">
        <div className="object">
          <div className="outline"></div>
          <div className="outline" id="delayed"></div>
          <div className="button"></div>
          <div className="button" id="circlein">
            <svg
              className="mic-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              enable-background="new 0 0 1000 1000"
              xmlSpace="preserve"
              style={{ fill: "#1E2D70" }}
            >
              <g>
                <path d="M500,683.8c84.6,0,153.1-68.6,153.1-153.1V163.1C653.1,78.6,584.6,10,500,10c-84.6,0-153.1,68.6-153.1,153.1v367.5C346.9,615.2,415.4,683.8,500,683.8z M714.4,438.8v91.9C714.4,649,618.4,745,500,745c-118.4,0-214.4-96-214.4-214.4v-91.9h-61.3v91.9c0,141.9,107.2,258.7,245,273.9v124.2H346.9V990h306.3v-61.3H530.6V804.5c137.8-15.2,245-132.1,245-273.9v-91.9H714.4z" />
              </g>
            </svg>
          </div>
        </div>

        <StyledInputBase
          placeholder={getText("Search-For")}
          inputProps={{ "aria-label": "search" }}
          value={transcript}
          className={`voice-search-input`}
        />
        <div className={style.transcriptMobile}>{transcript}</div>
      </div>
      <button className={style.closeBtn} onClick={resetTranscript}>
        <CloseIcon color="--text-color-alt" />
      </button>
    </div>
  );
};

export default SpeechScreen;
