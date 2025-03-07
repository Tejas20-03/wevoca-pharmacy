import React from 'react';
import style from './base-layout.module.scss';
export interface IProps {
  children: React.ReactNode;
  classes?: string;
}

const BaseLayout: React.FC<IProps> = ({ classes, children }) => {
  const mainClass = `${style.mainContainer} ${classes}`;
  return <main className={mainClass}>{children}</main>;
};

export default BaseLayout;
