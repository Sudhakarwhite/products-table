import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import ReviewsModal from './Component/Preview';

export interface Product {
  category: string;
  title: string;
  id: number;
  name: string;
  price: number;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
}

interface ProductsTableProps {
  products: Product[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewReviews = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: '100%',
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          '@media (max-width:600px)': {
            overflowX: 'auto', // Allow horizontal scrolling on small screens
          },
        }}
      >
        <Box
          sx={{
            display: 'block',
            '@media (max-width:600px)': {
              display: 'block',
              '& table': {
                display: 'block',
                width: '100%',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              },
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'primary.contrastText' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'primary.contrastText' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'primary.contrastText' }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'primary.contrastText' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'grey.100',
                    },
                    '&:hover': {
                      backgroundColor: 'grey.200',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ textTransform: 'none' }}
                      onClick={() => handleViewReviews(product)}
                    >
                      View Reviews
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
      <ReviewsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductsTable;
