import React from 'react';
import { Container, Typography } from '@mui/material';
import BaseLayout from '@/layouts/base-layout/base-layout';
import BoxTitle from '@/components/BoxTitle/Box-title';
import Buttons from '@/components/Button/Buttons';
import styles from './error-pg.module.scss';


const Custom500: React.FC = () => {
    return (
        <BaseLayout classes={styles.serverErrorPg}>
            <Container>
                <BoxTitle classes={styles.heading} boxTitle={'429'} />
                <Typography><span>Server-side error occurred.</span> Request Limit Reached Please wait for 1 minute</Typography>
            </Container>
        </BaseLayout >
    )
};

export default Custom500;
