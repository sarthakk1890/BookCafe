const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [3, "Price limit exceeded"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [ //using array of objects for multiple images
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required:[true, "Please specify the product's category" ]
    },
    stock:{
        type: Number,
        required: [true, "Please specify stock"],
        maxLength: [2, "Stock limit exceeded"],
        default: 1
    },
    numberOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name:{
                type:String,
                required: true
            },
            rating:{
                type: Number,
                required:true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    createAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema)