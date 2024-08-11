import mongoose from "mongoose";

let isConnected = false;    // tracks the connection with the DB.

export const connectToDb = async () => {
    mongoose.set('strict', true);

    if (isConnected) {
        console.log("MongdDB is already connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI.toString(), {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
    } catch (error) {
        console.log(error);
    }


}
