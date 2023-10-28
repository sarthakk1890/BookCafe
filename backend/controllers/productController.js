const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary")

//Create Product -- Admin
exports.createProduct = catchAsyncError(
    async (req, res, next) => {

        let images = []

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        }
        else {
            images = req.body.images;
        }

        const imageLink = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });
            imageLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imageLink;
        req.body.user = req.user.id;

        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        });
    }
);

//Get all Products
exports.getAllProducts = catchAsyncError(
    async (req, res) => {

        const resultPerPage = 8;
        const productsQuery = Product.find();
        // const productsCount = await Product.countDocuments();

        const apiFeature = new ApiFeatures(productsQuery, req.query)
            .search()
            .filter()
            .pagination(resultPerPage);

        const products = await apiFeature.query;
        const productsCount = await Product.countDocuments();

        res.status(200).json({
            success: true,
            products,
            productsCount,
            resultPerPage,
            filteredProductCount: products.length,
        });
    }
);

//Get all Products --(Admin)
exports.getAdminProducts = catchAsyncError(
    async (req, res) => {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            products,
        });
    }
);


//Get product details
exports.getProductDetails = catchAsyncError(
    async (req, res, next) => {

        const product = await Product.findById(req.params.id);

        if (!product) {
            // return res.status(500).json({
            //     success: false,
            //     message: "Product doesnot exist"
            // })
            return next(new ErrorHandler("Product not found", 404));
            //next is a callback function
        }

        res.status(200).json({
            success: true,
            product
        });
    }
);


//Update Product --admin
exports.updateProduct = catchAsyncError(
    async (req, res, next) => {

        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        //Image Update
        let images = []

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        }
        else {
            images = req.body.images;
        }

        if (images !== undefined) {
            //Deleting from cloudinary
            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id)
            }

            //Uploading new images in cloudinary
            const imageLink = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                });
                imageLink.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }

            req.body.images = imageLink;
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            product
        });
    }
);

//Delete Product
exports.deleteProduct = catchAsyncError(
    async (req, res, next) => {

        const ImgDel = await Product.findById(req.params.id);

        if (!ImgDel) {
            return next(new ErrorHandler("Product not found", 404));
        }

        //Deleting from cloudinary
        for (let i = 0; i < ImgDel.images.length; i++) {
            await cloudinary.v2.uploader.destroy(ImgDel.images[i].public_id)
        }

        const product = await Product.findOneAndDelete({ _id: req.params.id });

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    }
);

// Create a new review or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body; // Correct the typo in "productId"

    // Create the review object
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId); // Use 'await' to ensure you get the product

    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const existingReview = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if (existingReview) {
        existingReview.rating = rating;
        existingReview.comment = comment;
    } else {
        product.reviews.push(review);
    }

    product.numberOfReviews = product.reviews.length;

    let totalRating = 0;
    product.reviews.forEach((rev) => {
        totalRating += rev.rating;
    });
    product.ratings = totalRating / product.numberOfReviews;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});


// Get all review of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });

});

//Delete the review
exports.deleteReview = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not Found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() != req.query.id.toString()
    );

    let totalRating = 0;
    reviews.forEach((rev) => {
        totalRating += rev.rating;
    });

    const ratings = totalRating / reviews.length || 0;

    const numofReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numofReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true
    });

});