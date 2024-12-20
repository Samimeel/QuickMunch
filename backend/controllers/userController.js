import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from 'validator'

// login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User does not exits"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Please enter correct password"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Server Error"});
    }
}

// creating token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

// register user
const registerUser = async (req,res)=>{
    const {name,password,email} = req.body;
    try {
        // checking if user already exists
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"User with this email already exists"})
        }

        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"Password length must greater than 8"})
        }

        let lowerCase = false;
        let upperCase = false;
        let digit = false;
        let specialSymbol = false;
        let spsymbl = ['~','!','@','#','$','%','^','&','*','?'];
        for(let i=0;i<password.length;i++){
            if(password.charAt(i)<='z' && password.charAt(i)>='a'){
                lowerCase = true;
            }
            if(password.charAt(i)<='Z' && password.charAt(i)>='A'){
                upperCase = true;
            }
            if(password.charAt(i)<='9' && password.charAt(i)>='0'){
                digit = true;
            }
            if (spsymbl.includes(password.charAt(i))) {
                specialSymbol = true;
            }            
        }

        if(!lowerCase){
            return res.json({success:false,message:"Password must have at least one lower case character"})
        }
        if(!upperCase){
            return res.json({success:false,message:"Password must have at least one upper case character"})
        }
        if(!digit){
            return res.json({success:false,message:"Password must have at least one digit"})
        }
        if(!specialSymbol){
            return res.json({success:false,message:"Password must have at least one special character"})
        }

        // hashing use password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        // creating user
        const newUser = new userModel({
            name : name,
            email : email,
            password : hashedPassword,
        })
        const user = await newUser.save(); 
        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        // console.log(error);
        res.json({success:false,message:error})
    }
}

export {
    loginUser,
    registerUser
}