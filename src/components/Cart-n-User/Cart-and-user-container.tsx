import CartIcon from '@/containers/svg-icons/cart-icon';
import UserIcon from '@/containers/svg-icons/user-icon';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { openLoginPopup } from '@/redux/Login-popup/slice';

import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import CartQuantityNum from '@/components/cart/cart-quantity-num/cart-quantity-num';
import Style from './cart.module.scss'
import Cookies from 'js-cookie';

const CartAndUserContainer = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);

    const handleClick = () => {
        const getUserData = Cookies.get('user');
        const isLoggedIn = getUserData !== undefined ? JSON.parse(getUserData).isLoggedIn : false;
        if (isLoggedIn) {
            Router.push('/account')
        } else {
            dispatch(openLoginPopup())
        }
    }

    return (
        <div className={Style.CartUserContainer}>
            <button className='userLogin' onClick={handleClick}><UserIcon color='--text-color-alt' /></button>
            <Link href={{ pathname: '/cart' }} prefetch={false}>
                <CartIcon color='--text-color-alt' />
                <CartQuantityNum classes={Style.cartNum} quantity={cart.cartProducts?.length} />
            </Link>
        </div>
    )
}

export default CartAndUserContainer