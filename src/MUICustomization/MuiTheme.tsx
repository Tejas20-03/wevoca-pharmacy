// muiTheme.js

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: {
            xs: 0,
            sm: 575,
            md: 767,
            lg: 1200,
            xl: 1920,
        },
    },
    typography: {
        fontFamily: 'Inter, ' + 'sans-serif',
    },
})

export default theme