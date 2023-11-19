import express from 'express'
import User from '../model/User.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async(req,res,next) => {
    let user;
    try{
        user = await User.find()
    }catch(err){
        return console.log(err)
    }
    if(!user){
        return res.status(404).json({message: "No User FOund"})
    }
    return res.status(200).json({user})
}


export const signupUser = async(req,res,next) => {
    const {name,email,password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email})
        
    } catch (err) {
       return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message: "This Email is Already in Use!!, Try Signin instead"})
    }

    const hashedPassword = bcrypt.hashSync(password)
    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        blogs: []
    });

    try {
        await newUser.save();
        
    } catch (err) { 
        return  console.log(err);
        
    }
    return res.status(201).json({newUser})
} 


export const loginUser = async(req,res,next) => {
    const {email,password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email})
        
    } catch (err) {
       return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message: "This Email id is not Registered, PLease Signup"})
    }

    const comparePassword = bcrypt.compareSync(password, existingUser.password)
    if(!comparePassword){
        return res.status(400).json({message : "Password is incorrect"})
    }
    return res.status(200).json(existingUser.name + " Logged in Successfully")
}