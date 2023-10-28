import React, { useState } from 'react';
import logoImg from "../../../assets/heading.png"
import { IoHomeSharp, IoStorefrontOutline, IoStorefrontSharp, IoHomeOutline } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineAccountCircle, MdAccountCircle } from "react-icons/md";
import { BsCartFill, BsCart } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import "./style.css";

const Header = () => {

    const [dataVisible, setDataVisible] = useState(false);

    const handleToggle = () => {
        setDataVisible(prev => !prev);
    }


    return (
        <nav className='header'>
            <div className="logoImg">
                <Link to="/">
                    <img src={logoImg} alt="" />
                </Link>
            </div>

            <button className='mobile-nav-toggle' aria-controls='primary-navigation' aria-expanded={dataVisible} onClick={handleToggle}>
                <span className='sr-only'>Menu</span>
            </button>

            <div className="navMenu">
                <ul id='primary-navigation' data-visible={dataVisible} className='primary-navigation'>
                    <li>
                        <NavLink exact to="/" activeClassName="active">
                            <span>
                                <IoHomeOutline className="navIcons notActive" />
                                <IoHomeSharp className="navIcons onActive" />
                            </span>
                            <span aria-hidden="true">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" activeClassName="active">
                            <span>
                                <IoStorefrontOutline className="navIcons notActive" />
                                <IoStorefrontSharp className="navIcons onActive" />
                            </span>
                            <span aria-hidden="true">Store</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/account" activeClassName="active">
                            <span>
                                <MdOutlineAccountCircle className="navIcons notActive" />
                                <MdAccountCircle className="navIcons onActive" />
                            </span>
                            <span aria-hidden="true">Account</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" activeClassName="active">
                            <span>
                                <BsCart className="navIcons notActive" />
                                <BsCartFill className="navIcons onActive" />
                            </span>
                            <span aria-hidden="true">Cart</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/search" activeClassName="active">
                            <span>
                                <FaMagnifyingGlass className="navIcons" />
                            </span>
                            <span aria-hidden="true">Search</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;
