import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        // minLength: [ 3, 'Username must be at least 3 characters long' ],
        // maxLength: [ 20, 'Username must not be longer than 20 characters' ]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // minLength: [ 6, 'Email must be at least 6 characters long' ],
        // maxLength: [ 50, 'Email must not be longer than 50 characters' ]
    },

    password: {
        type: String,
        required: true,
        select: false,
        // minLength: [ 6, 'Password must be at least 6 characters long' ],
        // maxLength: [ 20, 'Password must not be longer than 20 characters' ]
    }
})


userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
userSchema.methods.isValidPassword = async function (password) {
    const user = await this.model('user').findOne({ _id: this._id }).select('password');
    return await bcrypt.compare(password, user.password);
}

userSchema.methods.generateJWT = function () {
    return jwt.sign(
        { email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}


const User = mongoose.model('user', userSchema);

export default User;