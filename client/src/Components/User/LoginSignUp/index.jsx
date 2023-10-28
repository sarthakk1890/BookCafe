import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from "react-toastify"
import './style.css'
import Loading from '../../Layout/Loading'
import { MdFaceRetouchingNatural } from 'react-icons/md'
import { FiMail, FiUnlock } from 'react-icons/fi'
import avat from "../../../assets/avatarPreview.png"
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login, register } from '../../../actions/userAction'


const LoginSignUp = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [avatar, setAvatar] = useState(avat);
    const [avatarPreview, setAvatarPreview] = useState(avat);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const redirect = location.search ? location.search.split("=")[1] : "account";

    useEffect(() => {
        if (error) {
            toast.error(error, { autoClose: 3000 });
            dispatch(clearErrors());
        }

        if(isAuthenticated){
            navigate(`/${redirect}`);
        }

    }, [dispatch, error, navigate, isAuthenticated, redirect])


    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral"); //adding classes in the elements
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <Fragment>
            {
                loading ? <Loading /> : (
                    <Fragment>
                        <div className="LoginSignUpContainer">
                            <div className="center">
                                <div className="LoginSignUpBox">
                                    <div>
                                        <div className="login-signup-toggle">
                                            <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                                            <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                                        </div>
                                        <button ref={switcherTab}></button>
                                    </div>

                                    <form ref={loginTab} className="loginForm center" onSubmit={loginSubmit}>
                                        <div className="loginEmail">
                                            <FiMail />
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                required
                                                value={loginEmail}
                                                onChange={(e) => setLoginEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="loginPassword">
                                            <FiUnlock />
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                required
                                                value={loginPassword}
                                                onChange={(e) => setLoginPassword(e.target.value)}
                                            />
                                        </div>
                                        <Link to="/password/forgot">Forget Password ?</Link>
                                        <input type="submit" value="Login" className="loginBtn" />
                                    </form>

                                    {/* ----------------------------SignUp----------------------------------------------------------- */}

                                    <form
                                        className="signupForm center"
                                        ref={registerTab}
                                        encType="multipart/form-data"
                                        onSubmit={registerSubmit}
                                    >
                                        <div className="signupName">
                                            <MdFaceRetouchingNatural />
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                required
                                                name="name"
                                                value={name}
                                                onChange={registerDataChange}
                                            />
                                        </div>
                                        <div className="signupEmail">
                                            <FiMail />
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                required
                                                name="email"
                                                value={email}
                                                onChange={registerDataChange}
                                            />
                                        </div>
                                        <div className="signupPassword">
                                            <FiUnlock />
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                required
                                                name="password"
                                                value={password}
                                                onChange={registerDataChange}
                                            />
                                        </div>

                                        <div id="registerImage">
                                            <img src={avatarPreview} alt="Avatar Preview" />
                                            <input
                                                type="file"
                                                name="avatar"
                                                accept="image/*"
                                                onChange={registerDataChange}
                                            />
                                        </div>
                                        <input type="submit" value="Register" className="signupBtn" />
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

export default LoginSignUp
