import React, { useMemo } from "react";
import style from "./home-section-title.module.scss";

interface IProps {
  tag?: string;
  title?: string;
  color?: string;
  className?: string;
}

const HomeSectionTitle: React.FC<IProps> = ({
  tag,
  title,
  className,
  color = "var(--text-color)",
}) => {
  const classes = useMemo(() => ` ${style.title} ${className}`, [className]);
  if (tag === "h1") {
    return (
      <h1 className={classes} style={{ color: color }}>
        {title}
      </h1>
    );
  } else {
    return (
      <h2 className={classes} style={{ color: color }}>
        {title}
      </h2>
    );
  }
};
export default HomeSectionTitle;
