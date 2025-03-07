import React from 'react';
import { Container, Typography } from '@mui/material';
import BaseLayout from '@/layouts/base-layout/base-layout';
import BoxTitle from '@/components/BoxTitle/Box-title';
import Buttons from '@/components/Button/Buttons';
import styles from './error-pg.module.scss';

import { useRouter } from 'next/router';


const Custom500: React.FC = () => {
    const router = useRouter();
    return (
        <BaseLayout classes={styles.serverErrorPg}>
            <Container>
                <BoxTitle classes={styles.heading} boxTitle={'500'} />
                <Typography><span>Server-side error occurred.</span> Please click the below button to reload the page</Typography>

                <Buttons btnClickFunction={() => router.reload()} btnClass='primary btn-half-rounded'>Reload</Buttons>
            </Container>
        </BaseLayout >
    )
};

export default Custom500;
