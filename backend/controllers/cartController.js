import { json } from 'express';
import userModel from '../models/userModel.js'


// add items to user's cart
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData; // cartData is a field in userModel which stores the data of cart itmes for the user
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Item added to cart"});
    } catch (error) {
        // console.log(error);
        res.json({success:false,message:"server error"});
    }
}

// remove items from user's cart
const removeFromCart = async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
            await userModel.findByIdAndUpdate(req.body.userId,{cartData});
            res.json({success:true,message:"Item removed from cart"});
        }
        else{
            res.json({success:false,message:"Please add atleast one instance of the item to cart"})
        }
    } catch (error) {
        // console.log(error);
        res.json({success:false,message:"server error"});
    }
}

// get user's cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        // console.log(error);
        res.json({success:false,message:"server error"});
    }
}

export {
    addToCart,
    removeFromCart,
    getCart,
}