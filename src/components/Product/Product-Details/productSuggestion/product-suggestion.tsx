import style from '@/components/Product/Product-Details/productDetail.module.scss';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import LeftArrowWithBg from '@/components/Global-Icon/Left-arrow-with-bg';
import RightArrowWithBg from '@/components/Global-Icon/right-arrow-with-bg';
import SectionLoader from '@/components/Section-loader/section-loader';
import dynamic from 'next/dynamic';
const ProductCard = dynamic(() => import('@/components/Product/Product-card/ProductCard'));
const ProductCategoryTitle = dynamic(() => import('@/components/Product/category-title/Product-category-title'));

interface Props {}

const ProductSuggestions: React.FC<Props> = ({ productSuggestion }) => {

  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

  return (
    <>
      {productSuggestion?.Data && productSuggestion?.Data?.length > 0 ? (
        <>
          <ProductCategoryTitle pgTitle={'Related Products'} tag={'h2'} />
          <div className={style.relativeSlider}>
            <div className={style.btnGroup}>
              <div className="swiper-button" ref={navigationPrevRef}>
                <LeftArrowWithBg />
              </div>
              <div className="swiper-button" ref={navigationNextRef}>
                <RightArrowWithBg />
              </div>
            </div>
            <Swiper
              className={style.productSwiper}
              slidesPerView={4}
              spaceBetween={25}
              onInit={(swiper) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                swiper.params.navigation.nextEl = navigationNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              modules={[Navigation]}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                320: {
                  slidesPerView: 2.4,
                  spaceBetween: 10,
                },
                576: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 25,
                },
              }}
            >
              {productSuggestion?.Data.map((item, index) => (
                <>
                  <SwiperSlide className={style.slide} virtualIndex={index} key={index}>
                    <ul className={style.emptyUl}>
                      {' '}
                      <ProductCard data={item} className={style.productCard} />
                    </ul>
                  </SwiperSlide>
                </>
              ))}
            </Swiper>
          </div>
        </>
      ) : productSuggestion?.Data?.length === 0 ? null : (
        <SectionLoader />
      )}
    </>
  );
};

export default ProductSuggestions;
