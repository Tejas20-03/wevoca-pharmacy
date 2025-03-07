import { InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',

  borderRadius: '5px',
  backgroundColor: 'transparent',
  width: '100%',
  height: '46px',
  border: '1px solid #E8ECF2',
  [theme.breakpoints.up('sm')]: {
    borderRadius: '12px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginLeft: '0',
    border: '1px solid #E8ECF2',
    height: '38px',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  left: '0',
  right: 'initial',
  zIndex: '2',
  cursor: 'pointer',
  // [theme.breakpoints.up('sm')]: {
  //   right: '0',
  //   left: 'initial',
  // },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  fontSize: '12px',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1, 5),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width'),
    width: '100%',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    fontSize: '14px',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1.2, 5, 1, 5),
      // padding: theme.spacing(1, 5, 1, 2),
      fontSize: '12px',
    },
  },
}));
