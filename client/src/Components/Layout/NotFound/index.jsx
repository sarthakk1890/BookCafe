import React from "react";
import { BiError } from "react-icons/bi";
import "./style.css";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="PageNotFound">
            <BiError />

            <Typography>Page Not Found </Typography>
            <Link to="/">Home</Link>
        </div>
    );
};

export default NotFound;