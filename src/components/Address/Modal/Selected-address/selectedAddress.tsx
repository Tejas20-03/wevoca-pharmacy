import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { deleteAddress, SelectAddress } from '@/redux/addresses/actions';
import { openCartPopup } from '@/redux/cart-remove-popup/slice';
import { useAppSelector } from '@/hooks/use-app-selector';
import { GetAddress_ResponseData } from '@/services/address/types';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import NormalAddressModalSelected from './normal-address-modal/Normal-Address-Modal-Selected';
import StartAddressModalSelected from '@/components/Address/Modal/Selected-address/start-address-modal/Start-Address-Modal-Selected';
import { closeStartingPopup } from '@/redux/address-popup/slice';
import { useRouter } from 'next/router';
interface IProps {
    data: GetAddress_ResponseData;
    id: number | null;
    removeCartContainer?: () => void;
    getAddressFunc?: () => void;
    isStartingAddressActive?: boolean;
}

const SelectedAddress: React.FC<IProps> = ({ data, id, getAddressFunc, isStartingAddressActive }) => {
    // Local State
    const [onDetele, setOnDetele] = useState<boolean>(false);
    const [expandedAddressID, setExpandedAddressID] = useState<number | undefined>(undefined);

    // Imported State and values
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { width: windowWidth } = useWindowDimensions();
    const { cartProducts } = useAppSelector((state) => state.cart);
    const userData = useAppSelector((state) => state.user);
    const { selectedAddressID, addresses } = useAppSelector((state) => state.addresses);
    const handleCloseCard = (event: Event | React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setOnDetele(true);
        return true;
    }

    const handleConfrimationNo = () => {
        setOnDetele(false);
    };

    const handleConfrimationYes = async (apiAddressID: string) => {
        const addressID = Number(apiAddressID);
        if (!isNaN(addressID)) {
            dispatch(deleteAddress({ addressID })).unwrap().then((response) => {
                if (response) {
                    setOnDetele(false);
                    getAddressFunc?.();
                    setTimeout(() => {
                        router.reload();
                        dispatch(closeStartingPopup())
                        const currentTime = new Date();
                        localStorage.setItem('addressPopupCloseTime', currentTime.toString());
                    }, 500)
                }
            });
        } else {
            // Handle the case when apiAddressID is not a valid number.
            console.error('Invalid addressID:', apiAddressID);
        }
    };

    const handelSelectAddress = (addressId: number) => {
        localStorage.setItem('selectedAddressID', addressId.toString());
        if (cartProducts?.length) {
            if (selectedAddressID !== addressId) dispatch(openCartPopup(addressId));
        } else {
            dispatch(SelectAddress({ addressID: Number(addressId) }));
            setTimeout(() => {
                router.reload();
                dispatch(closeStartingPopup())
                const currentTime = new Date();
                localStorage.setItem('addressPopupCloseTime', currentTime.toString());
            }, 500)
        }
    };
    const handelSelectAddress2 = (addressId: number) => {
        if (windowWidth > 575) {
            localStorage.setItem('selectedAddressID', addressId.toString());
            if (cartProducts?.length) {
                if (selectedAddressID !== addressId) dispatch(openCartPopup(addressId));
            } else {
                dispatch(SelectAddress({ addressID: Number(addressId) }));
            }
        } else {
            if (addressId === expandedAddressID) {
                setExpandedAddressID(undefined);
            } else {
                const newlySelectedAddressData = addresses.find((item) => item.addressID === addressId);
                setExpandedAddressID(newlySelectedAddressData?.addressID);
            }
        }
    };

    const activeSelectItemOnRadio = (addressId: number) => {
        localStorage.setItem('selectedAddressID', addressId.toString());
        if (cartProducts?.length) {
            if (selectedAddressID !== addressId) dispatch(openCartPopup(addressId));
        } else {
            dispatch(SelectAddress({ addressID: Number(addressId) }));
            setTimeout(() => {
                router.reload();
                dispatch(closeStartingPopup())
                const currentTime = new Date();
                localStorage.setItem('addressPopupCloseTime', currentTime.toString());
            }, 500)
        }
    };

    const selectedAddressIDFromStorage = localStorage.getItem('selectedAddressID');



    useEffect(() => {
        if (addresses?.length === 0) {
            dispatch(closeStartingPopup())
            const currentTime = new Date();
            localStorage.setItem('addressPopupCloseTime', currentTime.toString());
        }
    }, [addresses])


    return (
        <>
            {!isStartingAddressActive ?
                <NormalAddressModalSelected
                    data={data}
                    onDetele={onDetele}
                    id={id}
                    selectedAddressIDFromStorage={selectedAddressIDFromStorage}
                    handleConfrimationNo={handleConfrimationNo}
                    handleConfrimationYes={handleConfrimationYes}
                    handleCloseCard={(event: Event | React.MouseEvent<HTMLElement, MouseEvent>) => handleCloseCard(event)}
                    handelSelectAddress={handelSelectAddress}
                />
                :
                <StartAddressModalSelected
                    data={data}
                    onDetele={onDetele}
                    id={id}
                    selectedAddressIDFromStorage={selectedAddressIDFromStorage}
                    handleConfrimationNo={handleConfrimationNo}
                    handleConfrimationYes={handleConfrimationYes}
                    handleCloseCard={(event: Event | React.MouseEvent<HTMLElement, MouseEvent>) => handleCloseCard(event)}
                    handelSelectAddress2={handelSelectAddress2}
                    activeSelectItemOnRadio={activeSelectItemOnRadio}
                    expandedAddressID={expandedAddressID}
                />
            }
        </>
    );
};

export default SelectedAddress;