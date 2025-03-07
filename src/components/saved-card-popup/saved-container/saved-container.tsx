
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import CardRemoveContainer from '@/components/Address/Modal/Address-remove/Card-remove';
import CartBoxContainer from '@/components/cart/cart-box-container/cart-box-container';
import MasterCardIcon from '@/containers/svg-icons/master-card';
import RadioFill from '@/containers/svg-icons/radiofill';
import { GetCustomerTokenInCookiesStorage, GetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { creditCardActions } from '@/redux/credit-card/slice';
import { closeSavedCard } from '@/redux/saved-card/slice';
import { getDeleteCreditCard } from '@/services/credit-card/services';
import { CreditCardApiDataType } from '@/types/api-types';
import { Typography } from '@mui/material';
import { Slide, toast } from 'react-toastify';
import style from './saved-container.module.scss';

import RadioOut from '@/containers/svg-icons/radioout';
import { useAppSelector } from '@/hooks/use-app-selector';

interface IProps {
    data: CreditCardApiDataType;
}

const SavedCardContainer: React.FC<IProps> = ({ data, refetch }) => {
    const [onDetele, setOnDetele] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {selected} = useAppSelector((state) => state.creditCard);
    const handleConfrimationNo = () => {
        setOnDetele(false);
    }
    const handleCloseCard = (event: Event | React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation()
        setOnDetele(true);
    }
    const handleDeleteCard = async (item: CreditCardApiDataType) => {
        const customerToken = GetCustomerTokenInLocalStorage();
        const customerTokenCookies: string = await GetCustomerTokenInCookiesStorage();
        await getDeleteCreditCard(item.Token, { token: customerToken !== null ? customerToken || customerTokenCookies : undefined });

        refetch()
    };
    const handleConfrimationYes = () => {
        toast('Card Removed', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
            theme: "dark",
        });
        setOnDetele(false);
        handleDeleteCard(data);
    }
    const handleSelectedCard = (event: Event | React.MouseEvent<HTMLElement, MouseEvent>, item: CreditCardApiDataType | null | undefined) => {
        event.stopPropagation()
        dispatch(creditCardActions.setCreditCard({ selected: item }))
        setTimeout(() => {
            dispatch(closeSavedCard())
        }, 1000)
    }

    const formatExpiryDate = (expiryDate: string) => {
        const date = new Date(expiryDate);
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${month.toString().padStart(2, '0')}/${year}`;
    };

    return (
        <>
            {!onDetele ?
                <>
                    <label className={style.cardLabel} htmlFor={`${data.ID}`}>
                        <button onClick={(event) => handleSelectedCard(event, data)}></button>
                        <CartBoxContainer isCloseIcon={true} classes={`${style.selectedCardBox} ${selected?.ID === data.ID ? style.activeBox : ''}`} handleCloseCard={(event) => handleCloseCard(event)}>
                            <div className={style.cardContainer}>
                                <Typography>{selected?.ID === data.ID ? <RadioFill /> : <RadioOut />}<MasterCardIcon /> Debit/Credit Card</Typography>
                                <div>
                                    <Typography>{data.CardNumber} </Typography> <span>|</span> <Typography> {formatExpiryDate(data.Expiry)}</Typography>
                                </div>
                            </div>
                        </CartBoxContainer>
                    </label>
                </>
                :
                <>
                    <CardRemoveContainer handleConfrimationNo={handleConfrimationNo} handleConfrimationYes={handleConfrimationYes} />
                </>
            }
        </>
    );
};

export default SavedCardContainer;
