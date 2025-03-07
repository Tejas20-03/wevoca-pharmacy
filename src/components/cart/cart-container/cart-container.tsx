import React from 'react';
import CartBoxContainer from '@/components/cart/cart-box-container/cart-box-container';
import style from './cart-container.module.scss';
import SingleCart from './single-cart/single-cart';
import BillDetails from '@/components/cart/bill-details/bill-details';
import { useAppSelector } from '@/hooks/use-app-selector';

interface IProps {}

const CartContainer: React.FC<IProps> = () => {
  const cartData = useAppSelector((state) => state.cart);
  return (
    <CartBoxContainer classes={style.productCartContainer}>
      {cartData.cartProducts.length > 0 && cartData.cartProducts.map((item, index) => <SingleCart key={index} data={item} />)}
      <BillDetails />
    </CartBoxContainer>
  );
};

export default CartContainer;
