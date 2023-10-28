import React, { Fragment, useEffect } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getOrderDetails } from '../../../actions/orderAction'
import Loading from '../../Layout/Loading'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography';
import MetaData from '../../Layout/MetaData'


const OrderDetails = () => {

    const { order, loading, error } = useSelector((state) => state.orderDetails);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(id));

    }, [dispatch, error, id])


    return (
        <Fragment>
            {
                loading ? <Loading /> : (
                    <Fragment>
                        <MetaData title="Order Details" />
                        <div className="orderDetailsPage">
                            <div className="orderDetailsContainer">
                                <Typography component="h1">
                                    Order #{order && order._id}
                                </Typography>
                                <Typography>Shipping Info</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p>Name:</p>
                                        <span>{order.user && order.user.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>
                                            {order.shippingInfo && `+91 ${order.shippingInfo.phoneNo}`}
                                        </span>
                                    </div>
                                    <div>
                                        <p>Course:</p>
                                        <span>
                                            {order.shippingInfo &&
                                                `${order.shippingInfo.course}, ${order.shippingInfo.branch}, ${order.shippingInfo.semester}`}
                                        </span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>
                                            {order.shippingInfo &&
                                                `${order.shippingInfo.roomNumber}, ${order.shippingInfo.hostel}`}
                                        </span>
                                    </div>

                                </div>
                                <Typography>Payment</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p
                                            className={
                                                order.paymentInfo &&
                                                    order.paymentInfo.status === "Completed"
                                                    ? "greenColor"
                                                    : "redColor"
                                            }
                                        >
                                            {order.paymentInfo &&
                                                order.paymentInfo.status === "Completed"
                                                ? "PAID"
                                                : "NOT PAID"}
                                        </p>
                                    </div>

                                    <div>
                                        <p>Amount:</p>
                                        <span>{order.totalPrice && order.totalPrice}</span>
                                    </div>
                                </div>

                                <Typography>Order Status</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p
                                            className={
                                                order.orderStatus && order.orderStatus === "Delivered"
                                                    ? "greenColor"
                                                    : "redColor"
                                            }
                                        >
                                            {order.orderStatus && order.orderStatus}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="orderDetailsCartItems">
                                <Typography>Order Items:</Typography>
                                <div className="orderDetailsCartItemsContainer">
                                    {order.orderItems &&
                                        order.orderItems.map((item) => (
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
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default OrderDetails
