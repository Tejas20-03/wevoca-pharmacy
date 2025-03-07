import React, { useEffect, useState } from 'react';
import Style from './product-category-slider.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useAppSelector } from '@/hooks/use-app-selector';
import { getChildCategory } from '@/services/categories/services';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { ChildCategoryDataType } from '@/services/categories/types';
import { useResponsive } from '@/features/responsive';


interface IProps {

    slugUrl: string,
    fetchingType: string
}

const ProductCategorySlider: React.FC<IProps> = ({ slugUrl, fetchingType }) => {
    const [data, setData] = useState<ChildCategoryDataType[]>([]);
    const { isTablet } = useResponsive();
    const authToken = Cookies.get('auth-token');
    useEffect(() => {
        const categorySlider = async () => {

            if (fetchingType === 'atozmedicine') {
                const alphabetsArray: ChildCategoryDataType[] = Array.from(Array(26).keys()).map(item => ({ ID: String.fromCharCode(item + 65), Name: String.fromCharCode(item + 65), ParentID: slugUrl, Slug: String.fromCharCode(item + 65) }));
                setData(alphabetsArray);
            } else if (fetchingType === 'category') {
                getChildCategory(slugUrl, { token: '' }).then(response => {
                    if (response && response.ResponseType && response.ResponseType.toString() === '1') {
                        setData(response.Data);
                    }

                });
            }
            else setData([]);
        }
        categorySlider();
    }, [authToken, slugUrl]);

    return (<>
        {data ?
            <>
                {!isTablet ? <Swiper
                    slidesPerView={4}
                    spaceBetween={25}
                    className={Style.categorySlide}>
                    {data.map((data, index) => (
                        <>
                            <SwiperSlide className={Style.categoryItems} key={index}><Link prefetch={false} className={slugUrl === data.Name ? Style.activeCategory : ''} href={{ pathname: data.Slug }}>{data.Name}</Link></SwiperSlide>
                        </>
                    ))}

                </Swiper> :
                    <ul className={Style.categorySlide2}>
                        {data.map((data, index) => (
                            <li key={index}>
                                <Link prefetch={false} className={slugUrl === data.Name ? Style.activeCategory : ''} href={{ pathname: data.Slug }}>{data.Name}</Link>
                            </li>
                        ))}
                    </ul>
                }
            </>
            : <></>}
    </>);
};

export default ProductCategorySlider;
