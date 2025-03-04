import userModel from '../models/user.model.js';

export const createUser = async ({
    username, email, password
}) => {

    if (!email || !password || !username) {
        throw new Error('Please provide all required fields');
    }

    const hashedPassword = await userModel.hashPassword(password);

    // console.log("username === ", username);

    // check username
    if (!username || username.length <= 3) {
        throw new Error('Username must be at least 3 characters long');
    }



    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    return user;

}

export const getAllUsers = async ({ userId }) => {
    const users = await userModel.find({
        _id: { $ne: userId }
    });
    return users;
}