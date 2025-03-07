import Buttons from '@/components/Button/Buttons';
import CartBoxContainer from '@/components/cart/cart-box-container/cart-box-container';
import { Typography } from '@mui/material';
import React from 'react';
import style from '@/components/Address/Modal/Selected-address/selectedAddress.module.scss';
import CardRemoveContainer from '@/components/Address/Modal/Address-remove/Card-remove';
import RadioFill from '@/containers/svg-icons/radiofill';
import RadioOut from '@/containers/svg-icons/radioout';
import { GetAddress_ResponseData } from '@/services/address/types';


interface IProps {
    data: GetAddress_ResponseData;
    onDetele: boolean;
    id: number | null;
    handleConfrimationNo: () => void;
    handleConfrimationYes: (apiAddressID: string) => void;
    handleCloseCard: (event: Event | React.MouseEvent<HTMLElement, MouseEvent>) => boolean;
    handelSelectAddress: (addressId: number) => void;
    selectedAddressIDFromStorage: string | null;
}

const NormalAddressModalSelected: React.FC<IProps> = ({ selectedAddressIDFromStorage, data, onDetele, id, handleConfrimationNo, handleConfrimationYes, handleCloseCard, handelSelectAddress }) => {

    const dataID = data.ID !== undefined ? data.ID : '';
    const dataID2 = data.ID !== undefined ? data.ID : data.id;
    const dataTypAddress = data.Type !== undefined ? data.Type : data.addressType;
    const dataLocation = data.Location !== undefined ? data.Location : data.customAddress
    const dataIdComparsion = Number(data.ID) === Number(selectedAddressIDFromStorage)

    return (
        <>
            {data ?
                <>  {!onDetele ?
                    <label htmlFor={`${id}`} onClick={() => handelSelectAddress(Number(data.ID))}>
                        <CartBoxContainer key={JSON.stringify(dataID2)} data={data} isCloseIcon={true} classes={`${style.selectedAddressBox} ${dataIdComparsion ? style.activeAddress : ''}`} handleCloseCard={(event: Event | React.MouseEvent<HTMLElement, MouseEvent>) => handleCloseCard(event)}>
                            <div className={style.addressBox}>
                                <div className={style.dvago}>
                                    {dataIdComparsion ? <RadioFill /> : <RadioOut />}
                                    <Typography><Buttons btnClass={`primary btn-half-rounded ${style.addressTag}`}>{dataTypAddress} </Buttons> <span>{dataLocation}</span></Typography>
                                </div>
                            </div>
                        </CartBoxContainer>
                    </label>
                    : <CardRemoveContainer handleConfrimationNo={handleConfrimationNo} handleConfrimationYes={() => handleConfrimationYes(dataID)} />}
                </> : ''}
        </>
    );
};

export default NormalAddressModalSelected;