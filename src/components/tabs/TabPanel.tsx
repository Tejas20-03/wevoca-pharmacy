import { Typography } from '@mui/material';
import React from 'react';
import dynamic from 'next/dynamic';
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });




interface IProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    classes?: string;
}
const TabPanel: React.FC<IProps> = (props) => {
    const { children, value, index, classes, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            className={classes}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

export default TabPanel;