import React, { useEffect, useState } from 'react';
import style from './shipping-policy-index.module.scss';
import { Box, Typography } from '@mui/material';
import BreadCrumb from '@/components/Bread-crumb/BreadCrumb';
import PageWithBanner from '@/components/page-banner/page-with-banner';
import BoxTitle from '@/components/BoxTitle/Box-title';
import { getShippingPolicy } from '@/services/policies/services';
import { GetPrivacies_ResponseDataType } from '@/services/policies/types';
import SectionLoader from '@/components/Section-loader/section-loader';


const ShippingPolicyIndex: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [returnPolicy, setReturnPolicy] = useState([] as GetPrivacies_ResponseDataType | undefined);

    useEffect(() => {
        const refundFunc = async () => {
            setLoading(true);

            const returnPolicy = await getShippingPolicy({ token: '' })
            setReturnPolicy(returnPolicy);
            setLoading(false);
        }
        refundFunc();
    }, []);

    return (

        <PageWithBanner removeSideSpacing={style.pageSpacing}>
            <BreadCrumb FourthLink="Shipping Policy" classes='deal-breadcrumb' />
            {loading && <SectionLoader />}
            {!loading &&
                <Box className={style.policyBox}>

                    {returnPolicy && returnPolicy?.length > 0 && returnPolicy?.map((item, index) => (
                        <div key={index}>
                            <BoxTitle boxTitle={item.title} />
                            {item.content && <Typography variant="body2" component="div" dangerouslySetInnerHTML={{ __html: `${item.content}` }}></Typography>}
                        </div>
                    ))}
                </Box>
            }
        </PageWithBanner>
    );
};

export default ShippingPolicyIndex;