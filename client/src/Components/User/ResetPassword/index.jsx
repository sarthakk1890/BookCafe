import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify"
import './style.css'
import Loading from '../../Layout/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { FiUnlock, FiLock } from 'react-icons/fi'
import { clearErrors, resetPassword } from '../../../actions/userAction'
import MetaData from '../../Layout/MetaData'

const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
    }

    useEffect(() => {

        if (error) {
            toast.error(error, { autoClose: 3000 });
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Password Updated Successfully", { autoClose: 3000 })
            navigate("/login");
        }

    }, [dispatch, error, navigate, success])

    return (
        <Fragment>
            {
                loading ? <Loading /> : (
                    <Fragment>
                        <MetaData title="Change Password" />
                        <div className="resetPasswordContainer">
                            <div className="center">
                                <div className="resetPasswordBox">
                                    <h2 className='resetPasswordHeading'>Reset Password</h2>
                                    <form
                                        className="resetPasswordForm center"
                                        onSubmit={resetPasswordSubmit}
                                    >

                                        <div>
                                            <FiUnlock />
                                            <input
                                                type="password"
                                                placeholder="New Password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <FiLock />
                                            <input
                                                type="password"
                                                placeholder="Confirm Password"
                                                required
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>

                                        <input type="submit" value="Update" className="resetPasswordBtn" />
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

export default ResetPassword
