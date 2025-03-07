import React, { useMemo, useEffect, useState } from "react";
import style from "./Product-image-container.module.scss";
import Image from "next/image";

interface Props {
  className?: string;
  src: string;
  alt: string;
  type?: string;
  id?: string;
}

const ProductImage: React.FC<Props> = ({
  id,
  className,
  src,
  alt,
  type = "withoutAnim",
}) => {
  const [imageSize, setImageSize] = useState({ width: 100, height: 86 });
  const [imageLoaderState, setImageLoading] = useState<boolean>(false);
  useEffect(() => {
    // Function to set image dimensions based on screen width
    const setImageDimensions = () => {
      if (window.innerWidth > 992) {
        setImageSize({ width: 248, height: 213 });
      } else if (window.innerWidth === 992) {
        setImageSize({ width: 253, height: 218 });
      } else if (window.innerWidth >= 767) {
        setImageSize({ width: 192, height: 166 });
      } else if (window.innerWidth >= 575) {
        setImageSize({ width: 140, height: 120 });
      } else if (window.innerWidth >= 480) {
        setImageSize({ width: 182, height: 157 });
      } else if (window.innerWidth >= 360) {
        setImageSize({ width: 125, height: 108 });
      }
    };

    // Set initial image dimensions
    setImageDimensions();

    // Add event listener to update image dimensions on window resize
    window.addEventListener("resize", setImageDimensions);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", setImageDimensions);
    };
  }, []);

  const onImageLoad = () => {
    setImageLoading(true);
  };
  const classes = useMemo(
    () =>
      `${type === "withAnim" && style.anim} ${style.container} ${className}`,
    [type, className]
  );

  return (
    <div className={classes}>
      <div className={style.imageContainer}>
        {src && (
          <Image
            onLoad={onImageLoad}
            id={id}
            // src={imageLoaderState ? src : "/assets/dvago-logo.svg"}
            src={imageLoaderState ? src : "/assets/favicon.png"}
            alt={alt}
            quality={50}
            width={imageSize.width}
            height={imageSize.height}
            sizes="(min-width: 1300px) 249px, (min-width: 1000px) 19.29vw, (min-width: 580px) calc(33.25vw - 48px), (min-width: 460px) calc(50vw - 95px), (min-width: 340px) calc(41vw - 45px), 83px"
          />
        )}
      </div>
    </div>
  );
};

export default ProductImage;
