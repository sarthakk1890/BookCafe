import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './style.css'
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, getProductDetails, newReview } from "../../../actions/productAction"
import ReviewCard from "../ReviewCard"
import Loading from '../../Layout/Loading'
import { toast } from 'react-toastify'
import MetaData from "../../Layout/MetaData"
import { addItemsToCart } from "../../../actions/cartAction"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { NEW_PRODUCT_RESET, NEW_REVIEW_RESET } from '../../../constants/productConstant';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const ProductDetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch();

    const { product, error, loading } = useSelector((state) => state.productDetails)
    const { success, error: reviewError } = useSelector((state) => state.newReview)

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    //Ratings Option
    const options = {
        size: 'large',
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        toast.success("Item Added to Cart")
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        if (rating === 0) {
            toast.error("Please select a rating.");
        } else if (!comment) {
            toast.error("Please enter a comment.");
        } else {
            const myForm = new FormData();
            myForm.set("rating", rating);
            myForm.set("comment", comment);
            myForm.set("productId", id);
            dispatch(newReview(myForm));
            setOpen(false);
            dispatch({
                type: NEW_PRODUCT_RESET
            })
        }
    }

    useEffect(() => {

        if (error) {
            toast.error(error, { autoClose: 3000 });
            dispatch(clearErrors());
        }

        if (reviewError) {
            toast.error(reviewError, { autoClose: 3000 });
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Review Submitted Successfully");
            dispatch({
                type: NEW_REVIEW_RESET
            })
        }

        dispatch(getProductDetails(id));

    }, [dispatch, id, error, reviewError, success]);



    return (
        <Fragment>
            {
                loading ? <Loading /> : (
                    <Fragment>
                        <MetaData title={`${product.name} --BookCafe`} />
                        <div className="productDetails">

                            <div className="productImage">
                                {product.images ? <img src={product.images[0].url} alt="" /> : <h4>No image found</h4>}
                            </div>

                            <div>
                                <div className="detailsBlock-1">
                                    <h2>{product.name}</h2>
                                    <p>Product # {product._id}</p>
                                </div>

                                <div className="detailsBlock-2">
                                    <Rating {...options} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
                                    <span className='detailsBlock-2-span'>
                                        ({product.numberOfReviews} Reviews)
                                    </span>
                                </div>

                                <div className="detailsBlock-3">
                                    <h1>{`₹${product.price}`}</h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBlock-3-1-1">
                                            <button onClick={decreaseQuantity}>-</button>
                                            <input readOnly type="number" value={quantity} />
                                            <button onClick={increaseQuantity}>+</button>
                                        </div>
                                        <button
                                            disabled={product.stock < 1 ? true : false}
                                            onClick={addToCartHandler}
                                        >Add to Cart</button>
                                    </div>
                                    <p>
                                        Status:
                                        <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                            {product.stock < 1 ? " Out of Stock" : " In Stock"}
                                        </b>
                                    </p>

                                </div>
                                <div className="detailsBlock-4">
                                    Description : <p>{product.description}</p>
                                </div>

                                <button onClick={submitReviewToggle} className="submitReview">
                                    Submit Review
                                </button>
                            </div>
                        </div>

                        <h3 className="reviewsHeading"> REVIEWS </h3>

                        <Dialog
                            aria-labelledby="simple-dialog-title"
                            open={open}
                            onClose={submitReviewToggle}
                        >
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className="submitDialog noScroll">
                                <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    precision={0.5}
                                />

                                <textarea
                                    className="submitDialogTextArea"
                                    cols="30"
                                    rows="5"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={() => reviewSubmitHandler()} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <div className="reviewMain">
                            {product.reviews && product.reviews[0] ? (
                                <div className="reviews">
                                    {product.reviews &&
                                        product.reviews.map((review) => <ReviewCard review={review} />)}
                                </div>
                            ) : (
                                <p className="noReviews">No Reviews Available</p>
                            )}
                        </div>



                    </Fragment >
                )
            }
        </Fragment>
    )
}

export default ProductDetails
