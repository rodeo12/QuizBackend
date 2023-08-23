const { validationResult}= require("express-validator") ;
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken")
const User= require("../models/user")
const config= require("../config")


//SignUp

exports.signup = async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({error: errors.array()});
    }

const {email,password}= req.body;

try{
    //checking if user exists

const existingUser= await User.findOne({email});

if(existingUser){
    res.status(400).json({message: "user Already Exists"});
}

//password hashing

const hashedPassword= await bcrypt.hashPassword(password,10);

//Create a new User

const newUser= new User({ email,password:hashedPassword});
await newUser.save();

res.status(201).json({message: "Signup Successfull"});

}
catch(error){
    console.error("Error signing up",error);
    res.status(500).json({error: "ServerError"});
}
}


// Login

exports.login = async(req,res)=>{

    const {email,password}= req.body ;

    try{
        const user= await User.findOne({email});

      if(!user){
        res.status(401).json({error: "Invalid Credentials"});

      }

     // match passwords

     const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch){
        return res.status(401).json({error: "Invalid Credentials"});
     }

     //generate jwt

     const token = jwt.sign({userId:user._id},config.JWT_SECRET,{expiresIn: "1h"}) ;

     res.status(200).json({message: "Login Successfull",token});
        
    }
    catch(error){
        console.error("Error logging in",error);
        res.status(500).json({error: "Server Error"});
    }



}