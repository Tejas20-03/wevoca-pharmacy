import BoxTitle from '@/components/BoxTitle/Box-title';
import BaseLayout from '@/layouts/base-layout/base-layout';
import { Container, Typography } from '@mui/material';
import React from 'react';
import styles from './error-pg.module.scss';


const NotFound: React.FC = () => {
    return (
        <BaseLayout classes={styles.serverErrorPg}>
            <Container>
                <BoxTitle classes={styles.heading} boxTitle={'404'} />
                <Typography><span> Page Not Found</span></Typography>
            </Container>
        </BaseLayout >
    );
};

export default NotFound;
