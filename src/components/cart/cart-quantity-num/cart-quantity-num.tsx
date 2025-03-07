import React from 'react';
import style from './cart-quantity-num.module.scss';

interface IProps {
    classes?: string;
    quantity: number
}

const CartQuantityNum: React.FC<IProps> = ({ classes, quantity }) => {
    const quantityNumClass = `${style.CartQuantityNum} ${classes?.length && classes}`
    return (
        <>
            {quantity > 0 && <span className={quantityNumClass}>{quantity}</span>}
        </>
    );
};

export default CartQuantityNum;
