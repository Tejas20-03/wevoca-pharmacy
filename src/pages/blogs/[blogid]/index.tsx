import React from 'react';
import wrapper from '@/redux/store';
import axios from 'axios';
import { BASE_URL_DVAGO_API } from '@/services/config';
import { blogDetailData } from '@/services/blogs/types';
import { GetCategoryMenu } from '@/services/categories/services';
import { categoryNames } from '@/data/category-menu-names';

import dynamic from 'next/dynamic';
import Head from 'next/head';
const BlogDetailIndex = dynamic(() => import('@/containers/blogs/blog-detail-index/blog-detail-index'), { ssr: true });

interface IProps {
  blogDetailData: blogDetailData[];
}

const Index: React.FC<IProps> = ({ blogDetailData }) => {
  const blogDetail = blogDetailData?.[0];
  const schemaMarkup = JSON.stringify({
    '@context': 'http://schema.org',
    '@type': 'Article',
    name: blogDetail?.Title,
    image: blogDetail?.ImageURL,
    articleSection: 'Blogs',
  });
  return (
    <>
      <Head>
        <meta name="description" content={blogDetailData[0].MetaDescription || 'Discover the best deals on authentic pharmaceutical and wellness products at WeVoca Online Pharmacy. Our online medical store offers unbeatable prices on a range of products, including medicines, supplements, personal care items, and more. Shop now and save big!'} />
        <title>{blogDetailData[0].MetaTitle || 'Best Deals on Authentic Pharmaceutical & Wellness Products - WeVoca'}</title>
        <script type="application/ld+json" id="Blog-markup-schema" dangerouslySetInnerHTML={{ __html: schemaMarkup }} />
      </Head>
      <BlogDetailIndex blogDetail={blogDetailData} />;
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const slug = params?.blogid !== undefined && params?.blogid;
  const headersInfo = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const [blogDetail] = await Promise.all([axios.get(`${BASE_URL_DVAGO_API}/AppAPIV3/GetBlogBySlug&BlogSlug=${slug}`, headersInfo)]);
  const blogDetailData = blogDetail.data.Data;
  const categoryMenuPromises = categoryNames.map((categoryName) => GetCategoryMenu(categoryName, { token: '' }));
  const categoryMenuResponses = await Promise.all(categoryMenuPromises);
  return { props: { blogDetailData, categoryMenuResponses } };
});

export default Index;
