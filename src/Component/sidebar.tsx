import React, { useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Typography,
  Box,
  IconButton,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  useMediaQuery,
  useTheme,
  Slider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { RootState } from '../Store/store';
import { setCategoryFilter, setBrandFilter, setPriceRangeFilter } from '../Redux/Product/Productreducer';
import { styled } from '@mui/material/styles';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}));

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ open, onClose }, ref) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]); // Set initial price range
  const user = useSelector((state: RootState) => state.auth);
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Extract unique categories and brands
  const uniqueCategories = Array.from(
    new Set(products.products.map((product) => product.category))
  ).filter(Boolean);

  const uniqueBrands = Array.from(
    new Set(products.products.map((product) => product.brand))
  ).filter(Boolean);

  // Capitalize the first letter of a string
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleFilterClick = (type: 'category' | 'brand', value: string) => {
    if (type === 'category') {
      dispatch(setCategoryFilter(value));
    } else if (type === 'brand') {
      dispatch(setBrandFilter(value));
    }
    const defaultPriceRange = [0, 1000];
    setPriceRange(defaultPriceRange);
    onClose(); // Close the sidebar after selection
  };

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange(newValue);
      dispatch(setPriceRangeFilter(newValue));
    } else {
      console.error('Unexpected value type:', newValue);
    }
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {open && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
            zIndex: 1200, // Make sure it's above everything except the drawer
          }}
          onClick={onClose} // Close the sidebar when clicking the overlay
        />
      )}
      <Drawer
        ref={ref}
        sx={{
          width: isMobile ? '100%' : 350, // Full width for mobile, fixed width for desktop
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? '100%' : 350, // Full width for mobile, fixed width for desktop
            boxSizing: 'border-box',
            overflowY: 'auto', // Enable vertical scrolling
            transition: 'transform 0.3s ease-in-out',
            transform: open ? 'translateX(0)' : 'translateX(-100%)',
            backgroundColor: 'background.paper', // Ensure consistent background color
          },
        }}
        variant={isMobile ? 'temporary' : 'persistent'} // Use temporary variant for mobile
        anchor="left"
        open={open}
        onClose={onClose}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd', // Add bottom border
            position: 'sticky', // Make header sticky
            top: 0,
            zIndex: 1000, // Ensure it stays on top
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Avatar src={user.avatar} sx={{ mr: 2 }} />
          <Typography variant="h6">{`Hello ${user.user}`}</Typography>
        </Box>
        <Divider />
        <List
          sx={{
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <Accordion
            expanded={expanded === 'categories'}
            onChange={handleAccordionChange('categories')}
            sx={{
              mb: 2,
              boxShadow: 2,
              borderRadius: 1,
              '&:before': {
                display: 'none',
              },
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              width: '100%',
            }}
          >
            <AccordionSummary
              expandIcon={expanded === 'categories' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: 1,
                color: 'primary.contrastText',
                p: 1.5,
                '& .MuiAccordionSummary-content': {
                  marginLeft: 2,
                },
                '& .MuiAccordionSummary-expandIcon': {
                  color: 'primary.contrastText',
                },
                transition: 'background-color 0.3s ease',
              }}
            >
              <Typography variant="body1">Shop by Category</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                p: 2,
                backgroundColor: 'background.paper',
              }}
            >
              <List>
                {uniqueCategories.map((category) => (
                  <ListItem
                    button
                    key={category}
                    onClick={() => handleFilterClick('category', category)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        borderRadius: 1,
                        transition: 'background-color 0.3s ease',
                      },
                    }}
                  >
                    <ListItemText primary={capitalizeFirstLetter(category)} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'brands'}
            onChange={handleAccordionChange('brands')}
            sx={{
              mb: 2,
              boxShadow: 2,
              borderRadius: 1,
              '&:before': {
                display: 'none',
              },
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              width: '100%',
            }}
          >
            <AccordionSummary
              expandIcon={expanded === 'brands' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              sx={{
                backgroundColor: 'secondary.main',
                borderRadius: 1,
                color: 'secondary.contrastText',
                p: 1.5,
                '& .MuiAccordionSummary-content': {
                  marginLeft: 2,
                },
                '& .MuiAccordionSummary-expandIcon': {
                  color: 'secondary.contrastText',
                },
                transition: 'background-color 0.3s ease',
              }}
            >
              <Typography variant="body1">Shop by Brands</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                p: 2,
                backgroundColor: 'background.paper',
              }}
            >
              <List>
                {uniqueBrands.map((brand) => (
                  <ListItem
                    button
                    key={brand}
                    onClick={() => handleFilterClick('brand', brand)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'secondary.light',
                        borderRadius: 1,
                        transition: 'background-color 0.3s ease',
                      },
                    }}
                  >
                    <ListItemText primary={capitalizeFirstLetter(brand)} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'price'}
            onChange={handleAccordionChange('price')}
            sx={{
              mb: 2,
              boxShadow: 2,
              borderRadius: 1,
              '&:before': {
                display: 'none',
              },
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              width: '100%',
            }}
          >
            <AccordionSummary
              expandIcon={expanded === 'price' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
              sx={{
                backgroundColor: 'error.main',
                borderRadius: 1,
                color: 'error.contrastText',
                p: 1.5,
                '& .MuiAccordionSummary-content': {
                  marginLeft: 2,
                },
                '& .MuiAccordionSummary-expandIcon': {
                  color: 'error.contrastText',
                },
                transition: 'background-color 0.3s ease',
              }}
            >
              <Typography variant="body1">Price Range</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                p: 2,
                backgroundColor: 'background.paper',
              }}
            >
              <Box>
                <AirbnbSlider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={2000}
                />
                <Typography variant="caption">Price Range: ${priceRange[0]} - ${priceRange[1]}</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        </List>
      </Drawer>
    </>
  );
});

export default Sidebar;
