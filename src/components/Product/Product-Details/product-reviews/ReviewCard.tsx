import Box from '@mui/material/Box';
import style from './product-review.module.scss';
import { Rating, Stack, Typography } from '@mui/material';
import { FetchReviewsData } from '@/services/reviews/types';
import { toSentenceCase } from '@/functions/toSentanceCase';

interface Props {
  item: FetchReviewsData;
}

const formatDate = (dateString: string) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const ProductReviewCard: React.FC<Props> = ({ item }) => {
  const formattedDate = formatDate(item?.Created || '');
  return (
    <Box>
      <Box className={style.reviewDetailHeader}>
        <div>
          <Typography variant="body2" component="h4">
            {toSentenceCase(item?.CustomerName)}
          </Typography>
          <Typography>{formattedDate}</Typography>
        </div>
        <Stack spacing={1}>
          <Rating className={style.ratingInReview} name="half-rating-read" defaultValue={Number(item?.Rating)} precision={0.5} readOnly />
        </Stack>
      </Box>
      <Box className={style.reviewDetailDesc}>
        <Typography>{item?.Reviews}</Typography>
      </Box>
    </Box>
  );
};

export default ProductReviewCard;
