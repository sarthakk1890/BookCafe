import React, { Fragment, useState, useEffect } from 'react'
import { toast } from "react-toastify"
import './style.css'
import Loading from '../../Layout/Loading'
import { FiMail } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, forgotPassword } from '../../../actions/userAction'
import MetaData from '../../Layout/MetaData'

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    }

    useEffect(() => {

        if (error) {
            toast.error(error, { autoClose: 3000 });
            dispatch(clearErrors());
        }

        if (message) {
            toast.success(message, { autoClose: 3000 })
        }

    }, [error, message, dispatch])

    return (
        <Fragment>
            {
                loading ? <Loading /> : (
                    <Fragment>
                        <MetaData title="Forgot Password" />
                        <div className="forgotPasswordContainer">
                            <div className="center">
                                <div className="forgotPasswordBox">
                                    <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                                    <form
                                        className="forgotPasswordForm center"
                                        onSubmit={forgotPasswordSubmit}
                                    >
                                        <div className="forgotPasswordEmail">
                                            <FiMail />
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                required
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <input type="submit" value="Send " className="forgotPasswordBtn" />
                                    </form>

                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default ForgotPassword
