import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { RootState, AppDispatch } from './Store/store';
import { fetchProducts } from './Redux/Product/Productreducer';
import ProductsTable from './productTabel';
import Loader from './Component/Loader/Loader';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, categoryFilter, brandFilter, priceFilter } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, []);

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <p>Failed to load products.</p>;

  // Filter products based on the selected category, brand, and price range
  const filteredProducts = products.filter(product => {
    const categoryMatch = categoryFilter ? product.category === categoryFilter : true;
    const brandMatch = brandFilter ? product.brand === brandFilter : true;
    const priceMatch = priceFilter && Array.isArray(priceFilter)
      ? product.price >= priceFilter[0] && product.price <= priceFilter[1]
      : true;

    return categoryMatch && brandMatch && priceMatch;
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <ProductsTable products={filteredProducts} />
      </Box>
    </Box>
  );
};

export default ProductsPage;
