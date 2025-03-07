import Buttons from '@/components/Button/Buttons';
import CartBoxContainer from '@/components/cart/cart-box-container/cart-box-container';
import { Typography } from '@mui/material';
import React from 'react';
import style from '@/components/Address/Modal/Selected-address/selectedAddress.module.scss';
import CardRemoveContainer from '@/components/Address/Modal/Address-remove/Card-remove';
import RadioFill from '@/containers/svg-icons/radiofill';
import RadioOut from '@/containers/svg-icons/radioout';
import { GetAddress_ResponseData } from '@/services/address/types';
import Arrowbottom from '@/containers/svg-icons/arrow-bottom';


interface IProps {
    data: GetAddress_ResponseData;
    onDetele: boolean;
    id: number | null;
    handleConfrimationNo: () => void;
    handleConfrimationYes: (apiAddressID: string) => void;
    handleCloseCard: (event: Event | React.MouseEvent<HTMLElement, MouseEvent>) => boolean;
    handelSelectAddress2: (addressId: number) => void;
    activeSelectItemOnRadio: (addressId: number) => void;
    expandedAddressID: number | undefined;
    selectedAddressIDFromStorage: string | null;
}

const StartAddressModalSelected: React.FC<IProps> = ({ selectedAddressIDFromStorage, data, onDetele, id, handleConfrimationNo, handleConfrimationYes, handleCloseCard, handelSelectAddress2, activeSelectItemOnRadio, expandedAddressID }) => {
    const dataID = data.ID !== undefined ? data.ID : '';

    return (
        <>
            {data ?
                <>  {!onDetele ?
                    <label htmlFor={`${id}`} onClick={() => handelSelectAddress2(Number(data.ID))}>
                        <CartBoxContainer
                            key={JSON.stringify(data.ID !== undefined ? data.ID : data.id)}
                            isCloseIcon={true}
                            classes={style.selectedAddressBox2}
                            handleCloseCard={(event: Event | React.MouseEvent<HTMLElement, MouseEvent>) => handleCloseCard(event)}
                        >

                            <div className={style.addressBox2}>
                                <div className={style.dvago}>
                                    <div onClick={() => activeSelectItemOnRadio(Number(data.ID))}>{Number(data.ID) === Number(selectedAddressIDFromStorage) ? <RadioFill /> : <RadioOut />}</div>
                                    <Buttons btnClass={`primary btn-half-rounded ${style.addressTag2}`}>{data.Type !== undefined ? data.Type : data.addressType} </Buttons>
                                </div>
                                <Arrowbottom color='var(--primary-color)' />
                            </div>

                            {expandedAddressID?.toString() === data.ID ?
                                <div className={style.dvago2}>
                                    <Typography>{data.Location !== undefined ? data.Location : data.customAddress}</Typography>
                                </div>
                                :
                                Number(data.ID) === Number(selectedAddressIDFromStorage) ?
                                    <div className={style.dvago2}>
                                        <Typography>{data.Location !== undefined ? data.Location : data.customAddress}</Typography>
                                    </div>
                                    :
                                    <div className={`${style.dvago2} ${style.closed}`}>
                                        <Typography>{data.Location !== undefined ? data.Location : data.customAddress}</Typography>
                                    </div>
                            }

                        </CartBoxContainer>
                    </label>
                    : <CardRemoveContainer handleConfrimationNo={handleConfrimationNo} handleConfrimationYes={() => handleConfrimationYes(dataID)} />}
                </> : ''}
        </>
    );
};

export default StartAddressModalSelected;