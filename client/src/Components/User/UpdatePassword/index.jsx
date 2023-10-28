import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import './style.css'
import Loading from '../../Layout/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { FiUnlock, FiLock } from 'react-icons/fi'
import { MdVpnKey } from 'react-icons/md'
import { clearErrors, updatePassword } from '../../../actions/userAction'
import { UPDATE_PASSWORD_RESET } from '../../../constants/userConstant'
import MetaData from '../../Layout/MetaData'

const UpdatePassword = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  }

  useEffect(() => {

    if (error) {
      toast.error(error, { autoClose: 3000 });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password Changed Successfully", { autoClose: 3000 })
      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,

      })
    }

  }, [dispatch, error, navigate, isUpdated])

  return (
    <Fragment>
      {
        loading ? <Loading /> : (
          <Fragment>
            <MetaData title="Change Password" />
            <div className="updatePasswordContainer">
              <div className="center">
                <div className="updatePasswordBox">
                  <h2 className='updatePasswordHeading'>Update Password</h2>
                  <form
                    className="updatePasswordForm center"
                    onSubmit={updatePasswordSubmit}
                  >

                    <div className="loginPassword">
                      <MdVpnKey />
                      <input
                        type="password"
                        placeholder="Old Password"
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>

                    <div className="loginPassword">
                      <FiUnlock />
                      <input
                        type="password"
                        placeholder="New Password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    <div className="loginPassword">
                      <FiLock />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    <input type="submit" value="Change" className="updatePasswordBtn" />
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

export default UpdatePassword
