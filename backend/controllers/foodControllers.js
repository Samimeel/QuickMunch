import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req,res)=>{
    // console.log(req);
    let image_filename = `${req.file.filename}`;
    // console.log(image_filename);
    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        // console.log(error)
        res.json({success:false,message:"Error in add food item"})
    }
}

// all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({}); 
        res.json({success:true,data:foods})
    } catch (error) {
        // console.log(error)
        res.json({success:false,message:"error in fatching food"})
    }
}

// remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        console.log(req.body.id)
        fs.unlink(`uploads/${food.image}`, ()=>{}); // this delete the food item from the uploads folder

        await foodModel.findByIdAndDelete(req.body.id); // this deletes the food item form database
        res.json({success:true,message:"Food removed"});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error in deleting the food item"});
    }
}
export {
    addFood,
    listFood,
    removeFood,   
}