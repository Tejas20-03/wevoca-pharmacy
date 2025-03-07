
/* eslint-disable react/no-unescaped-entities */
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import {  closeCartPopup2 } from '@/redux/cart-remove-popup/slice';
import { Box, Typography } from '@mui/material';
import Buttons from '@/components/Button/Buttons';
import style from './cart-empty-popup.module.scss';
import { showSelectedTab } from '@/redux/address-popup/slice';
import dynamic from 'next/dynamic';
const GlobalModal = dynamic(() => import('@/components/global-modal/modal'), {ssr: false});

interface IProps {
    onSuccess: () => void;
    handleSaveAddress: (selectedAddressType: 'Home' | 'Work' | 'Other', addressFieldInput: string) => void
    selectedAddressType: 'Home' | 'Work' | 'Other',
    addressFieldInput: string
}

export interface radioObjProp {
    id: number;
    address: string,
    addressTag: string,
}

type addressType = string;
const addressTypeArray: Array<addressType> = ['Yes', 'No'];

const CartRemoveModal2: React.FC<IProps> = ({ onSuccess, handleSaveAddress, selectedAddressType, addressFieldInput }) => {
    const dispatch = useAppDispatch();
    const { cartPopup2 } = useAppSelector((state) => state.cartPopup);
    const handleButton = (item: addressType) => {
        if (item === 'Yes') {
            onSuccess();
            handleSaveAddress(selectedAddressType, addressFieldInput)
            dispatch(showSelectedTab());
            // dispatch(closeCartPopup2())
        } else {
            dispatch(closeCartPopup2())
        }
    }

    return (
        <GlobalModal
            openSelector={cartPopup2}
            closeFunc={() => dispatch(closeCartPopup2())}
            containerClass={style.cartContainer}
            contentClass={style.cartContainerContent}
            modalBoxClass={style.cartBoxContainer}
        >
            <Box className={style.gridBox}>
                <Typography>By adding new address, you'll lose you items inside your cart</Typography>
                <Box className={style.btnGroup}>
                    {addressTypeArray.map((item: addressType, index: number) => (
                        <Buttons key={index} btnClass={`primary btn-half-rounded`} btnClickFunction={() => handleButton(item)}> {item}</Buttons>
                    ))}
                </Box>
            </Box>
        </GlobalModal>
    );
};

export default CartRemoveModal2;
