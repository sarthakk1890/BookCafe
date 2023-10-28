import React, { Fragment, useState } from 'react'
import './style.css'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Backdrop from '@mui/material/Backdrop';
import profileImg from "../../../assets/profile.png"
import { MdSpaceDashboard } from "react-icons/md"
import { IoMdCart } from "react-icons/io"
import { FaListCheck } from "react-icons/fa6"
import { BsFillPersonFill } from "react-icons/bs"
import { IoExitOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../../../actions/userAction';


const UserOptions = ({ user }) => {

  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const options = [
    { icon: <FaListCheck />, name: "Orders", func: orders },
    { icon: <BsFillPersonFill />, name: "Profile", func: account },
    {
      icon: (
        <IoMdCart
        style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: cart,
    },
    { icon: <IoExitOutline />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <MdSpaceDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders/me");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    navigate("/login")
    toast.success("Logout Successfully", { autoClose: 3000 });
  }



  return (
    <Fragment >
      <Backdrop style={{ zIndex: "30" }} open={open} />
      <SpeedDial ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "31" }}
        open={open}
        direction="down"
        className="speedDial noScroll"
        icon={
          <img
            style={{ objectFit: "cover" }}
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : { profileImg }}
            alt="Profile"
          />
        }
      >
        {
          options.map((item) => (
            <SpeedDialAction 
            key={item.name} 
            icon={item.icon} 
            tooltipTitle={item.name} 
            onClick={item.func}
            tooltipOpen={true} />
          ))
        }
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
