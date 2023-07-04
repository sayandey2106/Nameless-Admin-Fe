import PropTypes from 'prop-types';
// @mui
import { useDispatch } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Button } from '@mui/material';
// component
import Iconify from '../../../components/iconify';
// import {=a} from '../../../store/AssignCastSlice';
import { assignCast } from '../../../store/AssignCastSlice';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

AssignCastToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function AssignCastToolbar({ numSelected, filterName, onFilterName,placeholder,selected }) {

const dispatch = useDispatch();

const handleAssignCast=()=>{
    dispatch(assignCast(selected));
}

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <>
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
        </>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Add">
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAssignCast}>
          Assign Cast
        </Button>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </StyledRoot>
  );
}
