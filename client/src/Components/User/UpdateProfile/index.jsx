import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import './style.css'
import Loading from '../../Layout/Loading'
import { MdFaceRetouchingNatural } from 'react-icons/md'
import { FiMail } from 'react-icons/fi'
import avat from "../../../assets/avatarPreview.png"
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, loadUser, updateProfile } from '../../../actions/userAction'
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstant'
import MetaData from '../../Layout/MetaData'

const UpdateProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [avatar, setAvatar] = useState(avat);
    const [avatarPreview, setAvatarPreview] = useState(avat);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            toast.error(error, { autoClose: 3000 });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Profile Updated Successfully", { autoClose: 3000 })
            dispatch(loadUser());
            navigate("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET,

            })
        }

    }, [dispatch, error, navigate, isUpdated, user])

    return (
        <Fragment>
            {
                loading ? <Loading /> : (
                    <Fragment>
                        <MetaData title="Update Profile" />
                        <div className="UpdateProfileContainer">
                            <div className="center">
                                <div className="UpdateProfileBox">
                                    <h2 className='UpdateProfileHeading'>Update Profile</h2>
                                    <form
                                        className="UpdateProfileForm center"
                                        encType="multipart/form-data"
                                        onSubmit={updateProfileSubmit}
                                    >
                                        <div className="UpdateProfileName">
                                            <MdFaceRetouchingNatural />
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                required
                                                name="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="UpdateProfileEmail">
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

                                        <div id="updateProfileImage">
                                            <img src={avatarPreview} alt="Avatar Preview" />
                                            <input
                                                type="file"
                                                name="avatar"
                                                accept="image/*"
                                                onChange={updateProfileDataChange}
                                            />
                                        </div>
                                        <input type="submit" value="Update Profile" className="UpdateProfileBtn" />
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

export default UpdateProfile
