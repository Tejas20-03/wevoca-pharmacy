import React from 'react';
import { Container, Typography } from '@mui/material';
import BaseLayout from '@/layouts/base-layout/base-layout';
import BoxTitle from '@/components/BoxTitle/Box-title';
import styles from './error-pg.module.scss';

const Custom504 = () => {
    return (
        <BaseLayout classes={styles.serverErrorPg}>
            <Container>
                <BoxTitle classes={styles.heading} boxTitle="504" />
                <Typography>
                    <span>Oops! Server error.</span>Please try again later.
                </Typography>
            </Container>
        </BaseLayout>
    );
};

export default Custom504;
