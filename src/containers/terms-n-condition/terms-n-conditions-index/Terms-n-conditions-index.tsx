import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import BreadCrumb from '@/components/Bread-crumb/BreadCrumb';
import PageWithBanner from '@/components/page-banner/page-with-banner';
import BoxTitle from '@/components/BoxTitle/Box-title';
import style from './terms-n-conditions-index.module.scss';
import { getTermPolicy } from '@/services/policies/services';
import { GetPrivacies_ResponseDataType } from '@/services/policies/types';
import SectionLoader from '@/components/Section-loader/section-loader';



interface IProps { }

const TermsNConditionsindex: React.FC<IProps> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [termsAndCondition, setTermsAndCondition] = useState([] as GetPrivacies_ResponseDataType | undefined);

    const refundFunc = async () => {
        setLoading(true);
        const termsAndCondition = await getTermPolicy({ token: '' })
        setTermsAndCondition(termsAndCondition);
        setLoading(false);
    }

    useEffect(() => {
        refundFunc();
    }, []);


    return (

        <PageWithBanner removeSideSpacing={style.pageSpacing}>
            <BreadCrumb FourthLink="Terms & Conditions" classes='deal-breadcrumb' />
            {loading && <SectionLoader />}
            {!loading &&
                <Box className={style.policyBox}>
                    {termsAndCondition !== undefined && termsAndCondition?.length > 0 && termsAndCondition?.map((item, index) => (
                        <div key={index}>
                            <BoxTitle boxTitle={item.title} />
                            <Typography variant="body2" component="div" dangerouslySetInnerHTML={{ __html: `${item.content}` }}></Typography>
                        </div>
                    ))}
                </Box>
            }
        </PageWithBanner>
    );
};

export default TermsNConditionsindex;