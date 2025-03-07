import React from "react";

interface ISvgProps {
  size?: number;
  color?: string;
  bgColor?: string;
  opacity?: number;
  className?: string;
}

const OrderBoxSvg: React.FC<ISvgProps> = ({
  size = 20,
  color = "white",
  bgColor = "#a2a2a2",
  opacity = 1, className
}) => (
  <svg className={className} width={size} height={size} viewBox="0 0 49 49" color={color} >
    <rect opacity="" width="49" height="49" rx="12"
      fill={bgColor}
    />
    <path
      d="M33.929 13.628C33.8546 13.4425 33.7264 13.2835 33.5608 13.1715C33.3952 13.0596 33.1999 12.9998 33 13H17C16.8001 12.9998 16.6048 13.0596 16.4392 13.1715C16.2736 13.2835 16.1454 13.4425 16.071 13.628L14.071 18.628C14.0241 18.7464 14 18.8726 14 19V34C14 34.2652 14.1054 34.5196 14.2929 34.7071C14.4804 34.8946 14.7348 35 15 35H35C35.2652 35 35.5196 34.8946 35.7071 34.7071C35.8946 34.5196 36 34.2652 36 34V19C36 18.8726 35.9759 18.7464 35.929 18.628L33.929 13.628ZM17.677 15H32.323L33.523 18H16.477L17.677 15ZM16 33V20H34V33H16Z"
      fill={color}
    />
    <path
      d="M23 29H19C18.7348 29 18.4804 29.1054 18.2929 29.2929C18.1054 29.4804 18 29.7348 18 30C18 30.2652 18.1054 30.5196 18.2929 30.7071C18.4804 30.8947 18.7348 31 19 31H23C23.2652 31 23.5196 30.8947 23.7071 30.7071C23.8946 30.5196 24 30.2652 24 30C24 29.7348 23.8946 29.4804 23.7071 29.2929C23.5196 29.1054 23.2652 29 23 29Z"
      fill={color}
    />
  </svg>
);

export default OrderBoxSvg;
