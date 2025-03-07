// components/Wheel.js
import React from 'react';
import style from './spin-the-wheel.module.scss';

const Wheel = () => {
  return (
    <div className={style.container}>
      <div className={style.wheel}>
        <div className={style.arrow}></div>
        <div className={style.spinButton} onClick={spin}>
          Spin
        </div>
        <div className={style.prize}>{prize}</div>
      </div>
    </div>
  );
};

export default Wheel;