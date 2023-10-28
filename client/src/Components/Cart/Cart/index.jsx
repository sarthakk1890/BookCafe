import React, { Fragment } from 'react'
import CartItemsCard from '../CartItemsCard'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { addItemsToCart, removeItemsToCart } from '../../../actions/cartAction'
import { MdRemoveShoppingCart } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import MetaData from '../../Layout/MetaData'

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const incQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQuantity))
  }

  const decQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQuantity))
  }

  const deleteCartItems = (id) => {
    dispatch(removeItemsToCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <Fragment>
      {
        cartItems.length === 0 ? (
          <div className="emptyCart center">
            <MdRemoveShoppingCart />
            <p>No Product in your Cart</p>
            <Link to="/products">View Products</Link>
          </div>
        ) : (
          <Fragment>
            <MetaData title="BookCafe --Cart"/>
            <div className="cartPage">
              <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>SubTotal</p>
              </div>

              {
                cartItems && cartItems.map((item) => (
                  <div className="cartContainer" key={item.product}>
                    <CartItemsCard item={item} deleteCartItems={deleteCartItems} />
                    <div className="cartInput">
                      <button onClick={() => decQuantity(item.product, item.quantity)}>-</button>
                      <input readOnly type="number" value={item.quantity} />
                      <button onClick={() => incQuantity(item.product, item.quantity, item.stock)}>+</button>
                    </div>
                    <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                  </div>
                ))
              }

              <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                  <p>Gross Total</p>
                  <p>{`₹${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                  <button onClick={checkoutHandler}>Check Out</button>
                </div>
              </div>
            </div>

          </Fragment>
        )
      }
    </Fragment>
  )
}

export default Cart
