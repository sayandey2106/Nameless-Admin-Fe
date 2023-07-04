import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import CASTS from '../_mock/cast';
import CastCardList from '../sections/@dashboard/cast/CastCardList';

// ----------------------------------------------------------------------

export default function CastDetailsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> CASTS | Nameless Dashboard </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Cast & Crew
        </Typography>

       
        

        <CastCardList casts={CASTS} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
