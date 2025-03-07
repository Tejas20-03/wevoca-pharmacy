import { Box, Tabs, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GetProductDescriptionByID_ResponseType } from '@/services/product/types';
import dynamic from 'next/dynamic';
import TabPanel2 from './TabPanel2';

const BoxTitle = dynamic(() => import('@/components/BoxTitle/Box-title'));
const Typography = dynamic(() => import('@mui/material/Typography'));


interface IProps {
    productDetailedDescriptionData: GetProductDescriptionByID_ResponseType | null,
    description: string;
    classes?: string;
}


function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const TabsItem: React.FC<IProps> = ({ description, productDetailedDescriptionData, classes }) => {
    const [value, setValue] = React.useState(0);
    const [keysData, setKeysData] = useState<string[]>([]);
    const [data, setData] = useState<Record<string, string> | null>(null);



    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (productDetailedDescriptionData !== undefined || productDetailedDescriptionData?.Data?.length > 0) {
            setKeysData(Object.keys(productDetailedDescriptionData?.Data?.length > 0 && productDetailedDescriptionData?.Data[0] || []));
            if (productDetailedDescriptionData && productDetailedDescriptionData?.Data?.length > 0 && productDetailedDescriptionData?.Data[0]?.Description !== '') setData(productDetailedDescriptionData?.Data?.length > 0 && productDetailedDescriptionData?.Data[0]);
            else setData(null);
        }
    }, [productDetailedDescriptionData]);

    const tabsList = productDetailedDescriptionData?.Data?.length > 0 && productDetailedDescriptionData?.Data[0]?.Description !== '' ? Object.keys(productDetailedDescriptionData?.Data?.length > 0 && productDetailedDescriptionData?.Data[0]).map((item, index) => <Tab label={item} {...a11yProps(index)} key={index} />) : <Tab label={"Description"} {...a11yProps(0)} />
    const descriptionList = (productDetailedDescriptionData?.Data?.length > 0 && productDetailedDescriptionData?.Data[0]?.Description !== '' ? Object.entries(productDetailedDescriptionData?.Data?.length > 0 && productDetailedDescriptionData?.Data[0]).map((item, index) => (
        <TabPanel2 classes='tabPanel' value={value} index={index} key={index}>
            <BoxTitle boxTitle={item[0]} />
            <Typography paragraph={true}>{item[1]}</Typography>
        </TabPanel2>)) : <TabPanel2 classes='tabPanel' value={value} index={0}>
        <BoxTitle boxTitle={"Description"} />
        <Typography paragraph={true}>{description}</Typography>
    </TabPanel2>)
    return (
        <Box
            className={`verticalTabs ${classes}`}
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >

                {tabsList}
            </Tabs>
            {descriptionList}
        </Box>
    );
};

export default TabsItem;