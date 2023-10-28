import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import { clearErrors, getProduct } from '../../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../Layout/Loading';
import ProductCard from '../ProductCard';
import { Pagination, Stack, Typography, Select, MenuItem } from '@mui/material';
import { toast } from "react-toastify"
import MetaData from "../../Layout/MetaData"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const categories = [
  'Auto-Biography',
  'Religion',
  'Classic',
  'Cook',
  'Comic',
  'Politics',
  'Health',
  'Thriller',
  'Spiritual',
  'Action',
  'Suspense',
  'Dharm',
  'General',
];

const Products = () => {
  const options = {
    emptyIcon: <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
  };

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);
  const dispatch = useDispatch();

  const { loading, error, products, productsCount, resultPerPage, filteredProductCount } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {

    if (error) {
      toast.error(error, { autoClose: 3000 });
      dispatch(clearErrors())
    }

    dispatch(getProduct(keyword, currentPage, category, ratings));
  }, [dispatch, keyword, currentPage, category, ratings, error]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>

          <MetaData title="Products --BookCafe" />

          <h2 className="productsHeading">Products</h2>

          {
            filteredProductCount === 0 ? (
              <div className="productsHeading" style={{ border: "none", fontSize: "20px" }}>
                No Product Found
              </div>
            ) : (
              <></>
            )
          }

          <div className="center">
            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>

          <div className="filterBox">
            <div className="filterBox-1">
              <Typography className='subHead'>Genres</Typography>
              <Select
                className='genreDrop'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                style={{ maxHeight: '30px', overflowY: 'hidden' }}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="filterBox-2">
              <Typography className='subHead'>Ratings Above</Typography>
              <div className="center noScroll" style={{ flexDirection: "column" }}>
                <Rating {...options} value={ratings}
                  onChange={(event, newValue) => {
                    setRatings(newValue);
                  }} />
                <button className="reset-rating" onClick={() => setRatings(0)}>Reset</button>
              </div>
            </div>
          </div>

          {resultPerPage <= filteredProductCount && (
            <div className="paginationBox">
              <Stack spacing={2} direction="row" justifyContent="center">
                <Pagination
                  count={Math.ceil(productsCount / resultPerPage)}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPageNo(page)}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Stack>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
