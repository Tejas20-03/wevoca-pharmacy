import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import PageWithBanner from '@/components/page-banner/page-with-banner';
import BreadCrumb from '@/components/Bread-crumb/BreadCrumb';
import style from './about-us.module.scss';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import PageBanner from '@/components/page-banner/Page-banner';

const Index: NextPage = () => {
  const bannerImage = [{ image: '/assets/cosome-e-web.jpeg', imageAlt: 'About Banner Image' || '' }];
  return (
    <>
      <Head>
        <meta name="description" content="Buy authentic pharmaceutical &amp; wellness products from Online Pharmacy &amp; Medical Store Online or Find a Wevoca Store near you. Call us to order at 021-11-11-38246." />
        <title>About — TEMP®</title>
      </Head>

      <PageWithBanner removeSideSpacing={style.pageSpacing}>
        <Image className={style.aboutPageBanner} width={1920} height={250} src="/assets/cosome-e-web.jpeg" alt="location icon" />
        <BreadCrumb FourthLink="About" classes="deal-breadcrumb" />
        <Box className={style.aboutWrapper}>
          <Typography variant="h4" component="h1" className={style.pageTitle}>
            Dorem ipsum dolor sit <span> amet consectetur</span>
          </Typography>
          <Box className={style.aboutGreenSec} style={{ position: 'relative' }}>
            <Typography>Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. </Typography>
          </Box>
          <Image className={style.aboutPerson} width={1920} height={250} src="/assets/about-page-img-123.png" alt="location icon" />
          <Typography variant="h4" component="h2" className={style.pageTitle}>
            Dorem ipsum dolor sit <span> amet consectetur</span>
          </Typography>
          <Image className={style.map} width={1920} height={250} src="/assets/map-image.png" alt="location icon" />
          <Box className={style.sectionWrapper}>
            <Typography variant="h4" component="h2" className={style.pageTitle}>
              Our <span> Mission</span>
            </Typography>
            <ul>
              <li>
                <Typography variant="h6" component="h3">
                  Corem Ipsum
                </Typography>
                <Typography>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti</Typography>
              </li>
              <li>
                <Typography variant="h6" component="h3">
                  Corem Ipsum
                </Typography>
                <Typography>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti</Typography>
              </li>
              <li>
                <Typography variant="h6" component="h3">
                  Corem Ipsum
                </Typography>
                <Typography>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti</Typography>
              </li>
              <li>
                <Typography variant="h6" component="h3">
                  Corem Ipsum
                </Typography>
                <Typography>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti</Typography>
              </li>
            </ul>
          </Box>
          <Box className={style.sectionWrapper}>
            <Typography variant="h4" component="h2" className={style.pageTitle}>
              Our <span> Commitment</span>
            </Typography>
            <ul>
              <li>
                <Typography variant="h6" component="h3">
                  Corem Ipsum
                </Typography>
                <Typography>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti</Typography>
              </li>
              <li>
                <Typography variant="h6" component="h3">
                  Corem Ipsum
                </Typography>
                <Typography>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti</Typography>
              </li>
              <li>
                <Typography variant="h6" component="h3">
                  Corem Ipsum
                </Typography>
                <Typography>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti</Typography>
              </li>
              <li>
                <Typography variant="h6" component="h3">
                  Corem Ipsum
                </Typography>
                <Typography>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti</Typography>
              </li>
            </ul>
          </Box>
          <Box className={style.sectionWrapper}>
            <Typography variant="h4" component="h2" className={style.pageTitle}>
              Our <span> Achievement</span>
            </Typography>
            <ul>
              <li>
                <Typography variant="h6" component="h3">
                  Corem Ipsum
                </Typography>
                <Typography>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti</Typography>
              </li>
              <li>
                <Typography variant="h6" component="h3">
                  Corem Ipsum
                </Typography>
                <Typography>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti</Typography>
              </li>
              <li>
                <Typography variant="h6" component="h3">
                  Corem Ipsum
                </Typography>
                <Typography>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti</Typography>
              </li>
              <li>
                <Typography variant="h6" component="h3">
                  Corem Ipsum
                </Typography>
                <Typography>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti</Typography>
              </li>
            </ul>
          </Box>
        </Box>
      </PageWithBanner>
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Index;
