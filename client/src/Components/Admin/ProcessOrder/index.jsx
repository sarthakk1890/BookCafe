import React, { Fragment, useEffect, useState } from 'react'
import MetaData from "../../Layout/MetaData"
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { toast } from 'react-toastify';
import { clearErrors, getOrderDetails, updateOrder } from '../../../actions/orderAction'
import Button from '@mui/material/Button';
import Sidebar from "../Sidebar";
import Loading from '../../Layout/Loading'
import { MdAccountTree } from 'react-icons/md'
import { UPDATE_ORDER_RESET } from '../../../constants/orderConstant';
import './style.css'

const ProcessOrder = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { order, loading, error } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order)

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(id, myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Order Status updated Successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id))
    }, [id, dispatch, error, updateError, isUpdated])

    const [status, setStatus] = useState("")

    return (

        <Fragment>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {
                        loading ? <Loading /> : (
                            <div className="confirmOrderPage" style={{display: order.orderStatus === "Delivered"? 'block' : 'grid'}}>
                                <div>
                                    <div className="confirmshippingArea">
                                        <Typography>Shipping Info</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <div>
                                                <p>Name:</p>
                                                <span>{order.user && order.user.name}</span>
                                            </div>
                                            <div>
                                                <p>Phone:</p>
                                                <span>
                                                    {`+91 ${order.shippingInfo && order.shippingInfo.phoneNo}`}
                                                </span>
                                            </div>
                                            <div>
                                                <p>Course:</p>
                                                <span>
                                                    {`${order.shippingInfo && order.shippingInfo.course}, ${order.shippingInfo && order.shippingInfo.branch}, ${order.shippingInfo && order.shippingInfo.semester}`}
                                                </span>
                                            </div>
                                            <div>
                                                <p>Address:</p>
                                                <span>
                                                    {`${order.shippingInfo && order.shippingInfo.roomNumber}, ${order.shippingInfo && order.shippingInfo.hostel}`}
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
                                                    {order && order.orderStatus}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="confirmCartItems">
                                        <Typography>Your Cart Items:</Typography>
                                        <div className="confirmCartItemsContainer">
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

                                <div style={{display: order.orderStatus === "Delivered"? 'none' : 'block'}}>
                                    <form
                                        encType="multipart/form-data"
                                        className="updateOrderForm"
                                        onSubmit={updateOrderSubmitHandler}
                                    >
                                        <h1>Process Order</h1>

                                        <div>
                                            <MdAccountTree />
                                            <select onChange={(e) => setStatus(e.target.value)}>
                                                <option value="">Choose Category</option>
                                                {
                                                    order.orderStatus === 'Processing' && (
                                                        <option value="Shipped">On Way</option>
                                                    )
                                                }
                                                {
                                                    order.orderStatus === 'Shipped' && (
                                                        <option value="Delivered">Delivered</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <Button
                                            id="createProductBtn"
                                            type="submit"
                                            disabled={loading ? true : false || status === "" ? true : false}
                                        >
                                            Process
                                        </Button>
                                    </form>
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default ProcessOrder;
