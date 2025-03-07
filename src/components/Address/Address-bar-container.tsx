
import Box from '@mui/material/Box';
import RightArrow from '@/components/Global-Icon/Right-arrow';
import AddressIcon from './Address-icon';
import AddressTextContainer from './Address-text-container';
import style from '@/components/Address/Address.module.scss';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { openAddressPopup, setOpenStartingPopup, showSelectedTab } from '@/redux/address-popup/slice';
import { useAppSelector } from '@/hooks/use-app-selector';
import Cookies from 'js-cookie';
import { openLoginPopup, openLoginPopupOnAddToCart } from '@/redux/Login-popup/slice';
import React, { useState } from 'react';

interface IProps {
    setAddNewAddressVal?: React.Dispatch<React.SetStateAction<boolean>>;
    setAddressBarClicked?: React.Dispatch<React.SetStateAction<boolean>>;
    mobile?: boolean;
}

const AddressBarContainer: React.FC<IProps> = ({ setAddNewAddressVal, setAddressBarClicked, mobile }) => {
    const [isClickable, setIsClickable] = useState(true); // Initialize clickability state
    const dispatch = useAppDispatch();
    const addressData = useAppSelector((state) => state.addresses);

    const handleOpenAddress = () => {
        if (!isClickable) return; // Check if clickable

        setIsClickable(false); // Disable clickability
        dispatch(setOpenStartingPopup())
        const getUserData = Cookies.get('user');
        const isLoggedIn = getUserData !== undefined ? JSON.parse(getUserData).isLoggedIn : false;
        if (isLoggedIn) {

            setAddressBarClicked?.(true);
            setAddNewAddressVal?.(true);
            dispatch(openAddressPopup());
            if (addressData.addresses?.length > 0) {
                dispatch(showSelectedTab());
            }
        } else {
            dispatch(openLoginPopup());
            dispatch(openLoginPopupOnAddToCart(true));
        }

        setTimeout(() => {
            setIsClickable(true); // Re-enable clickability after 1.5 seconds
        }, 1500);
    };


    return (
        <Box
            component='div'

            className={`${style.addressBox} ${mobile && style.mobileAddressBox}`}
            sx={{
                marginLeft: { md: '20px', sm: '15px', xs: '0' }
            }}
            onClick={handleOpenAddress}
        >
            <div className={style.addressIcon}>
                <AddressIcon />
            </div>
            <AddressTextContainer />
            <div className={style.address_arrow}>
                <RightArrow />
            </div>
        </Box>
    )
}

export default AddressBarContainer