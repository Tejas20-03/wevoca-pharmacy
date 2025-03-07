import React from "react";
import style from "./ticker.module.scss";

interface IProps {
  data: any | undefined;
}

const Ticker: React.FC<IProps> = ({ data }) => {
  const contentLength = data ? data?.length : 0;
  const animationDuration = contentLength > 100 ? 28 : 8;

  console.log("Data from the Ticker", data);

  return (
    <div className={style.ticker}>
      <span style={{ animationDuration: `${animationDuration}s` }}>
        {data
          ? data.Data?.map((item: string, index: number) => {
              return <span key={index}>{item}</span>;
            })
          : ""}
      </span>
    </div>
  );
};

export default Ticker;
