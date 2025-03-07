import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface Style {
  style: string;
  windowWidth?: number;
}

const LogoSec: React.FC<Style> = ({ style }) => {
  return (
    <Link prefetch={false} href="/">
      <Image
        className={style}
        // src="/assets/dvago-green-small-logo.svg"
        src="/assets/temp-green-small-logo.png"
        alt="WeVoca Logo"
        width={40}
        height={40}
      />
    </Link>
  );
};

export default LogoSec;
