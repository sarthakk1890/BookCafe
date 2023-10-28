import React, { Fragment, useEffect } from 'react'
import { BsMouse } from "react-icons/bs"
import "./style.css"
import ProductCard from '../Product/ProductCard'
import MetaData from '../Layout/MetaData'
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import Loading from '../Layout/Loading'
import { toast } from 'react-toastify';

const Home = () => {


  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.products)

  useEffect(() => {
    
    if(error){
      toast.error(error, {autoClose: 3000});
      dispatch(clearErrors());
    }

    dispatch(getProduct());

  }, [dispatch, error]);

  return (
    <Fragment>
      {
        loading ? <Loading /> :
          <Fragment>
            <MetaData title="BookCafe" />

            <div className="banner">
              <p>Welcome to Book Cafe</p>

              <h1>Find all your desired books</h1>

              <a href="#featuredBooks">
                <button>Scroll <BsMouse /></button>
              </a>

            </div>

            <div id="featuredBooks">
              <h2 className="homeHeading">Featured Books</h2>

              <div className="container" id="container">
                {products && products.map(product => (
                  <ProductCard product={product} />
                ))}
              </div>
            </div>
          </Fragment>
      }
    </Fragment>
  )
}

export default Home
