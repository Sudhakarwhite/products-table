import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
// import { Product } from './Redux/Product/initalstate'; // Adjust based on your Product type

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
interface ReviewsModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ open, onClose, product }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ backgroundColor: '#3f51b5', color: '#fff', textAlign: 'center' }}>
        Reviews for {product.title}
      </DialogTitle>
      <DialogContent>
        {product.reviews && product.reviews.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {product.reviews.map((review, index) => (
              <Box key={index} sx={{
                padding: 2,
                borderRadius: 1,
                boxShadow: 3,
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                transition: '0.3s',
                '&:hover': {
                  borderColor: '#3f51b5',
                  boxShadow: 6,
                }
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 1 }}>
                  {review.reviewerName}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', marginBottom: 1 }}>
                  {review.comment}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888', marginBottom: 1 }}>
                  Rating: {review.rating}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888' }}>
                  {new Date(review.date).toLocaleDateString()}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ color: '#888', textAlign: 'center' }}>
            No reviews available.
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#f5f5f5', justifyContent: 'center' }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewsModal;
