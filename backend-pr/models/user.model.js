const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name : {
            type: String,
            required: [true, "Please enter user name"]
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        admin: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User