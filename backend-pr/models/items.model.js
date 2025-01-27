const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name : {
            type: String,
            required: [true, "Please enter user name"]
        },
        price: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product