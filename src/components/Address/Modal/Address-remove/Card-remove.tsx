import Buttons from '@/components/Button/Buttons';
import CartBoxContainer from '@/components/cart/cart-box-container/cart-box-container';
import { Typography } from '@mui/material';
import React from 'react';
import style from './Card-remove.module.scss';

interface IProps {
    handleConfrimationYes: () => void;
    handleConfrimationNo: () => void;
}

const CardRemoveContainer: React.FC<IProps> = ({ handleConfrimationYes, handleConfrimationNo }) => {
    return (
        <CartBoxContainer classes={style.addressBoxContainer}>
            <Typography>Are you sure you want to delete this address?</Typography>
            <Buttons btnClass={`primary ${style.addressBtn2}`} btnClickFunction={handleConfrimationNo}>No</Buttons>
            <Buttons btnClass={`primary ${style.addressBtn}`} btnClickFunction={handleConfrimationYes}>Yes</Buttons>
        </CartBoxContainer>
    );
};

export default CardRemoveContainer;
