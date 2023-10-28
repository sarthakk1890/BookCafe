import React, { Fragment } from 'react'
import "./style.css"
import { AiFillCheckCircle } from 'react-icons/ai'
import { useParams, Link } from 'react-router-dom'

const PaymentSuccess = () => {

    const { reference } = useParams();


    return (
        <Fragment>
            <div className='paymentSuccess center'>
                <AiFillCheckCircle />
                <h1>Order Placed Successfully</h1>
                <p><b>Reference id:</b> {reference}</p>
                <Link to="/orders/me">View Orders</Link>
            </div>
        </Fragment>
    )
}

export default PaymentSuccess
