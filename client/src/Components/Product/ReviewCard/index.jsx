import React from 'react'
import profileImg from "../../../assets/profile.png"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';


const ReviewCard = ({ review }) => {

    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
        emptyIcon: <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
    };

    return (
        <div className="reviewCard">
            <img src={profileImg} alt="" />
            <p>{review.name}</p>
            <Rating {...options} /><br/>
            <span className='reviewCardComment'>{review.comment}</span>
        </div>
    )
}

export default ReviewCard
