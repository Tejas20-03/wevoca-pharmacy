import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface Style {
  style: string;
  windowWidth?: number;
}

const LogoSec2: React.FC<Style> = ({ style }) => {
  return (
    <Link prefetch={false} href="/">
      <Image
        className={style}
        // src="/assets/dvago-logo.svg"
        src="/assets/favicon.png"
        alt="WeVoca Logo"
        width={160}
        height={90}
      />
    </Link>
  );
};

export default LogoSec2;
