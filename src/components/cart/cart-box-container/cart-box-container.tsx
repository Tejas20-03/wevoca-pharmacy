import BoxTitle from '@/components/BoxTitle/Box-title';
import Buttons from '@/components/Button/Buttons';
import LinkButton from '@/components/Button/LinkButton';
import CloseIcon from '@/components/Global-Icon/Close-icon';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import style from './cart-box-container.module.scss';
import { SavedAddressDataType } from '@/redux/addresses/slice';
import { GetAddress_ResponseData } from '@/services/address/types';

interface IProps {
    buttonText?: string | Boolean,
    boxTitle?: string;
    linkText?: string;
    linkURL?: string;
    children: React.ReactNode;
    classes?: string;
    isCloseIcon?: boolean;
    data?: SavedAddressDataType | GetAddress_ResponseData;
    handleCloseCard?: (event: Event | React.MouseEvent<HTMLElement, MouseEvent>) => void;
    btnOnClick?: () => void;
}

const CartBoxContainer: React.FC<IProps> = ({ handleCloseCard, linkText, linkURL, buttonText, boxTitle, children, classes, isCloseIcon = false, btnOnClick }) => {
    const boxClass = useMemo(() => `${style.boxContainer} ${classes?.length && classes}`, [classes])
    return (
        <Box className={boxClass}>
            {isCloseIcon &&  handleCloseCard && <button className={`${style.closeBtn} delete-close-btn`} onClick={(event: Event | React.MouseEvent<HTMLElement, MouseEvent>) => handleCloseCard(event)}><CloseIcon color="--primary-color" /></button>}
            {boxTitle?.length && <BoxTitle boxTitle={boxTitle} />}
            {children}
            {typeof buttonText === 'string' && buttonText.length > 0 && (<Buttons btnClass='primary btn-half-rounded' btnClickFunction={btnOnClick}>{buttonText} </Buttons>)}
            {linkText?.length && <LinkButton link={linkURL} btnClass='primary btn-half-rounded LinkBtn'>{linkText}</LinkButton>}
        </Box>
    );
};

export default CartBoxContainer;
