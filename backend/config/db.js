import mongoose from "mongoose";
import 'dotenv/config'
export const connectDB = async ()=>{
   try {
     await mongoose.connect(`${process.env.URI}/${process.env.NAME}`)
     .then(()=>{
         console.log("MongoDB is connected successfully");
     }) 
   } catch (error) {
    console.log(error);
   }
}