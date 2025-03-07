import { Typography } from '@mui/material';
import React from 'react';
import dynamic from 'next/dynamic';
const Box = dynamic(() => import('@mui/material/Box'), { ssr: true });



interface IProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    classes?: string;
}
const TabPanel2: React.FC<IProps> = (props) => {
    const { children, value, index, classes, ...other } = props;
    return (
        <div
            role="2"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            className={classes}
            {...other}
        >
            <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
            </Box>
        </div>
    );
};

export default TabPanel2;