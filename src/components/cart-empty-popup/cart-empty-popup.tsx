
/* eslint-disable react/no-unescaped-entities */
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { closeCartPopup } from '@/redux/cart-remove-popup/slice';
import { Box, Typography } from '@mui/material';
import Buttons from '@/components/Button/Buttons';
import style from './cart-empty-popup.module.scss';

import { SelectAddress } from '@/redux/addresses/actions';
import { emptyCart } from '@/redux/cart/actions';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const GlobalModal = dynamic(() => import('@/components/global-modal/modal'), {ssr: false});

interface IProps { }

export interface radioObjProp {
    id: number;
    address: string,
    addressTag: string,
}

type addressType = string;
const addressTypeArray: Array<addressType> = ['Yes', 'No'];

const CartRemoveModal: React.FC<IProps> = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { cartPopup, addressId } = useAppSelector((state) => state.cartPopup);
    const handleButton = (item: addressType) => {
        if (item === 'Yes') {
            dispatch(SelectAddress({ addressID: addressId }))
            dispatch(emptyCart({}));
            dispatch(closeCartPopup())
            setTimeout(() => {
                router.reload();
            }, 500)
        } else {
            dispatch(closeCartPopup())
        }
    }

    return (
        <GlobalModal
            openSelector={cartPopup}
            closeFunc={() => dispatch(closeCartPopup())}
            containerClass={style.cartContainer}
            contentClass={style.cartContainerContent}
            modalBoxClass={style.cartBoxContainer}
        >
            <Box className={style.gridBox}>
                <Typography>By changing the address, you'll lose your items inside the cart</Typography>
                <Box className={style.btnGroup}>
                    {addressTypeArray.map((item: addressType, index: number) => (
                        <Buttons key={index} btnClass={`primary btn-half-rounded`} btnClickFunction={() => handleButton(item)}> {item}</Buttons>
                    ))}
                </Box>
            </Box>
        </GlobalModal>
    );
};

export default CartRemoveModal;
