import React from 'react';
import CartBoxContainer from '@/components/cart/cart-box-container/cart-box-container';
import style from './single-cart.module.scss';
import { Box, Typography } from '@mui/material';
import CloseIcon from '@/components/Global-Icon/Close-icon';
import CartQuantity from '@/components/cart/cartQuantity';
import { removeProductFromCart } from '@/redux/cart/actions';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import Link from 'next/link';
import Image from 'next/image';
import { CartProductType } from '@/redux/cart/slice';
import { numberWithCommas } from '@/functions/numberWithCommas';
import { removeFromCartMixPanelFunction } from '@/utils/mix-panel-hooks';
import { useAppSelector } from '@/hooks/use-app-selector';

interface IProps {
  data: CartProductType;
}

const SingleCart: React.FC<IProps> = ({ data, decodedPaymentMethod }) => {
  const dispatch = useAppDispatch();
  const storeData = useAppSelector((state) => state.store);
  const cartData = useAppSelector((state) => state.cart);
  const handelRemoveCart = () => {
    if (data?.data?.Variation !== undefined) {
      if (!data?.perStrip) {
        dispatch(removeProductFromCart({ products: [{ id: data?.id.toString(), qtyToRemove: 'all' }], perStrip: false }))
          .unwrap()
          .then((response) => {
            removeFromCartMixPanelFunction(data.quanity, data?.data?.VariationTitle, data?.data, '', storeData?.selectedStoreID?.toString() || '32', cartData?.total);
          });
      } else {
        dispatch(removeProductFromCart({ products: [{ id: data?.id.toString(), qtyToRemove: 'all' }], perStrip: true }))
          .unwrap()
          .then((response) => {
            removeFromCartMixPanelFunction(data.quanity, data?.data?.VariationTitle, data?.data, '', storeData?.selectedStoreID?.toString() || '32', cartData?.total);
          });
      }
    } else {
      dispatch(removeProductFromCart({ products: [{ id: data?.data?.ProductID.toString(), qtyToRemove: 'all' }], perStrip: undefined }))
        .unwrap()
        .then((response) => {
          removeFromCartMixPanelFunction(data.quanity, data?.data?.VariationTitle, data?.data, '', storeData?.selectedStoreID?.toString() || '32', cartData?.total);
        });
    }
  };
  return (
    <CartBoxContainer classes={style.singleItemContainer}>
      {!decodedPaymentMethod && (
        <button className={style.closeBtn} onClick={() => handelRemoveCart()}>
          <CloseIcon color="--primary-color" />
        </button>
      )}
      <div className={style.productImage}>
        <Link href={{ pathname: `/p/${data?.data?.Slug}` }} prefetch={false}>
          <Image fill src={data?.data?.ProductImage} alt={`${data?.data?.Title?.toLowerCase()} Product Image` || 'Product Image'} />
        </Link>
      </div>
      <div className={style.productContent}>
        <Typography className={style.productTitle} variant="body2" component="p">
          <Link href={{ pathname: `/p/${data?.data?.Slug}` }} prefetch={false}>
            {data?.data?.Title}
          </Link>
        </Typography>
        <Typography className={style.productCategory} variant="body2" component="p">
          {!data?.perStrip && data?.perStrip !== undefined ? `Per Box ( ${data?.data?.Variation?.[0]?.NoofStrips} Strips = ${data?.data?.Variation?.[0]?.TotalTablets} Tablets )` : data?.perStrip ? `Per Strip ( ${data?.data?.Variation?.[1]?.NoofStrips} Strips = ${data?.data?.Variation?.[1]?.TotalTablets} Tablets )` : data?.data?.Category}
        </Typography>
        <Box className={style.productPriceQuantityBox}>
          <div>
            {!data?.perStrip && data?.perStrip !== undefined ? (
              <>
                {data?.data?.Variation?.[0]?.DiscountPrice !== '0' ? <Typography className={style.productPrice}>KWD {numberWithCommas(parseFloat(data?.data?.Variation?.[0]?.DiscountPrice).toFixed(2))}</Typography> : <Typography className={style.productPrice}>KWD {numberWithCommas(parseFloat(data?.data?.Variation?.[0]?.SalePrice).toFixed(2))}</Typography>}
                {data?.data?.Variation?.[0]?.DiscountPrice !== '0' && <Typography className={`${style.regularPrice}`}>KWD {numberWithCommas(parseFloat(data?.data?.Variation?.[0]?.SalePrice).toFixed(2))}</Typography>}
              </>
            ) : data?.perStrip && data?.perStrip !== undefined ? (
              <>
                {data?.data?.Variation?.[1].DiscountPrice !== '0' ? <Typography className={style.productPrice}>KWD {numberWithCommas(parseFloat(data?.data?.Variation?.[1].DiscountPrice).toFixed(2))}</Typography> : <Typography className={style.productPrice}>KWD {numberWithCommas(parseFloat(data?.data?.Variation?.[1].SalePrice).toFixed(2))}</Typography>}
                {data?.data?.Variation?.[1].DiscountPrice !== '0' && <Typography className={`${style.regularPrice}`}>KWD {numberWithCommas(parseFloat(data?.data?.Variation?.[1].SalePrice).toFixed(2))}</Typography>}
              </>
            ) : (
              <>
                {data?.data?.DiscountPrice !== '0' ? <Typography className={style.productPrice}>KWD {numberWithCommas(parseFloat(data?.data?.DiscountPrice).toFixed(2))}</Typography> : <Typography className={style.productPrice}>KWD {numberWithCommas(parseFloat(data?.data?.Price).toFixed(2))}</Typography>}
                {data?.data?.DiscountPrice !== '0' && <Typography className={`${style.regularPrice}`}>KWD {numberWithCommas(parseFloat(data?.data?.Price).toFixed(2))}</Typography>}
              </>
            )}
          </div>
          <CartQuantity decodedPaymentMethod={decodedPaymentMethod} selectedOptionVal={data?.perStrip === undefined ? '' : data?.perStrip ? 'Strip' : 'Box'} productData={data.data} perStrip={data?.perStrip} />
        </Box>
      </div>
    </CartBoxContainer>
  );
};

export default SingleCart;
