import mongoose from "mongoose"

export async function connectDB() {

    try {

        if (mongoose.connections[0].readyState) {
            console.log("MongoDB already connected")
            return
        }


        await mongoose.connect(process.env.MONGODB_URI)

        console.log("MongoDB connected successfully")

    } catch (error) {

        console.log("MongoDB connection error:",err)
        throw err

    }



}