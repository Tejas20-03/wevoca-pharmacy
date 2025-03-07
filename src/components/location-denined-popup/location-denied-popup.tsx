import { useAppDispatch } from '@/hooks/use-app-dispatch';

import { Box, Typography } from '@mui/material';
import React from 'react';
import style from '@/components/global-modal/modal.module.scss';
import { useAppSelector } from '@/hooks/use-app-selector';
import { closePermissionDenined } from '@/redux/permission-denied-popup/slice';
import styles from './location-denied.module.scss';
import dynamic from 'next/dynamic';
const GlobalModal = dynamic(() => import('@/components/global-modal/modal'), {ssr: false});



interface IProps {
    openSelector?: boolean,
    closeFunc: Function,
    children: React.ReactNode,
    contentClass?: string,
    containerClass?: string
    modalBoxClass?: string;
}

const LocationDeniedPopup: React.FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const { permissionDeninedPopup } = useAppSelector((state) => state.permissionDeninedPopup);

    const askLocation = () => {
        dispatch(closePermissionDenined())
    }

    return (
        <GlobalModal
            openSelector={permissionDeninedPopup}
            closeFunc={askLocation}
            containerClass={styles.cartContainer}
            contentClass={styles.cartContainerContent}
            modalBoxClass={styles.cartBoxContainer}
            modalHeadClass={styles.modalHeadStyling}
        >
            <Box className={`${style.gridBox} ${styles.permissionGrid}`}>
                <Typography variant='body1' component='h2'>Enable location access on your browser:</Typography>
                <Box className={styles.points}>
                    <ol>

                        <li>Click on the Padlock icon <span className="icon-align-middle icon-margin"><svg aria-hidden="true" focusable="false" className="fl-none" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="neutral-secondary"><path d="M8 2C9.84095 2 11.3333 3.58017 11.3333 5.52941V6.94118C11.7015 6.94118 12 7.25721 12 7.64706V13.2941C12 13.684 11.7015 14 11.3333 14H4.66667C4.29848 14 4 13.684 4 13.2941V7.64706C4 7.25721 4.29848 6.94118 4.66667 6.94118V5.52941C4.66667 3.58017 6.15905 2 8 2ZM8 3.5C6.89543 3.5 6 4.4402 6 5.6V6.6C6 6.82091 6.17909 7 6.4 7H9.6C9.82091 7 10 6.82091 10 6.6V5.6C10 4.4402 9.10457 3.5 8 3.5Z"></path></svg></span> to the left of the address bar.</li>
                        <li>Find location under permissions.</li>
                        <li>Change it to allow.</li>
                    </ol>
                </Box>
                <Box className={styles.gotItBtn}>
                    <button onClick={askLocation}>Got it</button>
                </Box>
            </Box>
        </GlobalModal>
    );
};

export default LocationDeniedPopup;
