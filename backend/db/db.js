import mongoose from "mongoose";


function connect() {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 60000, // Increase timeout to 60 seconds
        socketTimeoutMS: 60000, // Increase socket timeout to 60 seconds
    })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(err => {
            console.log("MongoDB connection error");
            console.log(err);
        })
}

export default connect;