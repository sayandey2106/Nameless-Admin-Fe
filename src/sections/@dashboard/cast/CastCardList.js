import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import CastCard from './CastCard';

// ----------------------------------------------------------------------

CastCardList.propTypes = {
  casts: PropTypes.array.isRequired,
};

export default function CastCardList({ casts, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {casts.map((casts) => (
        <Grid key={casts.id} item xs={12} sm={6} md={3}>
          <CastCard casts={casts} />
        </Grid>
      ))}
    </Grid>
  );
}
