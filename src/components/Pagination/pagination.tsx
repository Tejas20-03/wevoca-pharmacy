import { Pagination, Stack } from '@mui/material';
import { NextRouter } from 'next/router';
import React from 'react';

interface IProps {
    PageCount: number;
    handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    router: NextRouter;
}

const PaginationComp: React.FC<IProps> = ({ PageCount, handleChange, router }) => {
    const currentPage = router.query.page ? Number(router.query.page) : 1;

    // Check if the clicked page is different from the current page before calling handleChange
    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        if (currentPage !== value) handleChange?.(event, value);
    };
    return (
        <div className="paginationContainer">
            <Stack spacing={2}>
                <Pagination page={currentPage} onChange={handlePaginationChange} count={PageCount} variant="outlined" shape="rounded" />
            </Stack>
        </div>
    );
};

export default PaginationComp;