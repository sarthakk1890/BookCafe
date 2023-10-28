import React, { Fragment, useEffect, useState } from 'react'
import './style.css'
import MetaData from "../../Layout/MetaData"
import CheckoutSteps from "../CheckoutSteps"
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { clearErrors, createOrder } from '../../../actions/orderAction'
import Switch from '@mui/material/Switch';
import axios from 'axios';

const ConfirmOrder = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.newOrder)

  const [delivery, setDelivery] = useState(true);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
  })

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const handleChange = (event) => {
    setDelivery(event.target.checked);
  };

  const shippingCharges = delivery ? 10 : 0;

  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.roomNumber}, ${shippingInfo.hostel}`;
  const courseInfo = `${shippingInfo.course}, ${shippingInfo.branch}, ${shippingInfo.semester}`;


  //------------------------------------------------Payment Function using RazorPay------------------------------------------------
  const proceedToPayment = async () => {

    setActiveStep(2);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data: { key } } = await axios.get("/api/v1/apiKey", config)
    const { data: { order } } = await axios.post('/api/v1/payment/process', { amount: totalPrice }, config);

    const orderDB = {
      shippingInfo,
      orderItems: cartItems,
      itemPrice: subtotal,
      deliveryCharge: shippingCharges,
      totalPrice: totalPrice,
    }

    const options = {
      key,
      amount: order.amount,
      currency: 'INR',
      name: 'BookCafe',
      description: 'Pay for your Order',
      image: 'https://res.cloudinary.com/dzxg41hqi/image/upload/v1697919220/bookCafe_payment_sfvswn.png',
      order_id: order.id,
      handler: async function (response) {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

        const url = `/api/v1/verifyPayment?order_id=${razorpay_order_id}&payment_id=${razorpay_payment_id}&signature=${razorpay_signature}`;
        const { data: { isValid } } = await axios.get(url);

        if (isValid) {
          orderDB.paymentInfo = {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            status: "Completed"
          }
          dispatch(createOrder(orderDB));
          toast.success("Order placed successfully!");
          navigate(`/payment/success/${razorpay_order_id}`)
        }
        else {
          toast.error("Something Went Wrong");
          return;
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingInfo.phoneNo,
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      toast.error(response.error.code, { autoClose: 3000 });
    });
    rzp1.open();
  }


  //------------------------------------------------END function------------------------------------------------


  return (
    <Fragment>
      <MetaData title={"Confirm and Pay"} />
      <CheckoutSteps activeStep={activeStep} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">

              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone Number</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Course Information:</p>
                <span>{courseInfo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>

            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <div>
                  <p>Delivery Charges:</p>
                  <span>₹{shippingCharges}</span>
                </div>
                <div className="toggleDelivery">
                  <p className={delivery ? '' : 'deliverActive'}>Self Pickup</p>
                  <Switch
                    checked={delivery}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <p className={delivery ? 'deliverActive' : ''}>Deliver to Room</p>
                </div>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={() => proceedToPayment()}>Proceed To Payment</button>
          </div>
        </div>

      </div>
    </Fragment>
  )
}

export default ConfirmOrder
