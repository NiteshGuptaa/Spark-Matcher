const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();


const userAuth = async (req, res, next)=>{

    // Allow preflight OPTIONS requests to pass through
    if (req.method === "OPTIONS") {
        return next();
    }

    try{
        const {token} = req.cookies;
        if(!token)
            //  throw new Error("token is not valid");
             return res.status(401).send("plz login....")

        //validating or varifing the token 
        // const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
        const decodedObj = await jwt.verify(token,  process.env.JWT_SECRET);
        
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        // console.log(user._id);
        // console.log(user);
        if(!user) throw new Error("User not found");

        req.user = user;
        next();
    }catch(err){
        res.status(400).send("ERROR: " + err);
    }
}

module.exports = {userAuth};