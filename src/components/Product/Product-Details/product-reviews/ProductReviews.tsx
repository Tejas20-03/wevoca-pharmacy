import BoxTitle from '@/components/BoxTitle/Box-title';
import Box from '@mui/material/Box';
import style from './product-review.module.scss';
import Buttons from '@/components/Button/Buttons';
import FilledStarIcon from '@/containers/svg-icons/filled-star';
import { Pagination, Rating, Slider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { FetchReviewsData } from '@/services/reviews/types';
import ProductReviewCard from './ReviewCard';

interface Props {
  data: FetchReviewsData[];
}

const ProductReviews: React.FC<Props> = ({ data }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [filteredReviews, setFilteredReviews] = useState<FetchReviewsData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const reviewsPerPage = 3;

  // Calculate total number of pages
  const totalPages = Math.ceil((selectedRating ? filteredReviews.length : data.length) / reviewsPerPage);
  // Determine which reviews to display based on pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = selectedRating ? filteredReviews.slice(indexOfFirstReview, indexOfLastReview) : data.slice(indexOfFirstReview, indexOfLastReview);

  const handleRatingClick = (rating: number) => {
    if (selectedRating === rating) {
      setSelectedRating(null);
      setCurrentPage(1); // Reset to first page when the same filter is clicked again
    } else {
      setSelectedRating(rating);
      setCurrentPage(1); // Reset to first page when a new filter is applied
      const item = data?.filter((item) => Number(item.Rating) === rating);
      setFilteredReviews(item);
    }
  };

  // Function to calculate the average rating
  const calculateAverage = () => {
    const sumOfRatings = data.reduce((acc, review) => acc + Number(review.Rating), 0);
    const averageRating = Number(sumOfRatings) / data.length;
    return averageRating?.toString()?.slice(0, 3);
  };

  const calculateRatingCount = (rating: number) => data.filter((review) => Number(review.Rating) === rating).length;

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const getRatingText = (averageRating: number): string => {
    if (averageRating >= 1 && averageRating < 2) {
      return 'Very Poor';
    } else if (averageRating >= 2 && averageRating < 2.6) {
      return 'Poor';
    } else if (averageRating >= 2.6 && averageRating < 3.5) {
      return 'Average';
    } else if (averageRating >= 3.5 && averageRating < 4.5) {
      return 'Good';
    } else {
      return 'Excellent';
    }
  };
  return (
    <Box className={style.ReviewWrapper}>
      <BoxTitle classes={style.reviewTitle} boxTitle="Ratings & Reviews" />
      <Box className={style.reviewBoard}>
        <Box className={style.AverageReview}>
          <Box className={style.averageNum}>
            <Typography variant="h2" component="h3">
              {calculateAverage()}
            </Typography>
            <Typography>{getRatingText(Number(calculateAverage()))}</Typography>
          </Box>
          <Stack spacing={1}>
            <Rating className={style.ratingInReview} name="half-rating-read" value={Number(calculateAverage())} precision={0.5} readOnly />
          </Stack>
        </Box>
        <Box className={style.reviewList}>
          <ul>
            {[5, 4, 3, 2, 1].map((rating) => (
              <li key={rating}>
                <Stack spacing={1}>
                  <Rating className={style.ratingInReview} name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                </Stack>
                <Slider
                  disabled
                  defaultValue={calculateRatingCount(rating) / data?.length} // Normalize the value to be in the range of 0 to 1
                  max={1} // Set the maximum value of the Slider to 1
                  step={0.01} // Set a small step to allow for more granular control
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  value={calculateRatingCount(rating) / data?.length}
                  className={style.ratingSlider}
                  sx={{
                    color: 'transparent',
                    '& .MuiSlider-track': {
                      backgroundColor: 'var(--primary-color)', // Hide the track
                    },
                    '& .MuiSlider-thumb': {
                      display: 'none', // Hide the thumb
                    },
                  }}
                />
                <Stack spacing={1}>{calculateRatingCount(rating)}</Stack>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
      <ul className={style.reviewStarButtons}>
        {[5, 4, 3, 2, 1].map((rating) => (
          <li key={rating}>
            <Buttons btnClass={`btn primary btn-half-rounded ${selectedRating === rating ? style.activeButton : ''}`} btnClickFunction={() => handleRatingClick(rating)}>
              <FilledStarIcon />
              <Typography>{rating}</Typography>
            </Buttons>
          </li>
        ))}
      </ul>
      <Box className={style.reviewsDetails}>{selectedRating === null && data?.length ? currentReviews.map((item, index) => <ProductReviewCard item={item} key={`${index}_${item?.ID}`} />) : filteredReviews?.length ? currentReviews.map((item, index) => <ProductReviewCard item={item} key={`${index}_${item?.ID}`} />) : <Typography>Review not found</Typography>}</Box>
      {totalPages > 1 && (
        <div className="paginationContainer">
          <Stack spacing={2}>
            <Pagination page={currentPage} onChange={handlePaginationChange} count={totalPages} variant="outlined" shape="rounded" />
          </Stack>
        </div>
      )}
    </Box>
  );
};

export default ProductReviews;
