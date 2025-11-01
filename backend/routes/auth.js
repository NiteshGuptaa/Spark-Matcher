const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSingupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { userAuth } = require("../middlewares/auth");

authRouter.post("/signup", async (req, res) => {
    try {
        // Validate body data
        validateSingupData(req);

        const { firstName, lastName, emailId, password, gender, age } = req.body;

        if (!emailId) return res.status(400).json({ error: 'Email ID is required.' });

        // Check if another user with the same email ID exists
        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists.' });
        }

        // Encrypt password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new instance of User
        const newUser = new User({
            firstName, lastName, emailId, password: passwordHash,
        });

        // Save the user
        const savedUser = await newUser.save();
        const token = await savedUser.getJWT(); // Generate token

        // Set token in cookies
        res.cookie("token", token, {
            httpOnly: true, // Prevent client-side access
            secure: true, // Use 'true' in production (HTTPS)
            sameSite: "none", // Required for cross-origin requests
            maxAge: 8 * 3600000, // 8 hours
        });

        return res.json({ message: "User created successfully", data: newUser });
    } catch (err) {
        console.log("error");
        return res.status(404).send("ERROR: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        // Finding user with this email and password
        const user = await User.findOne({ emailId });
        if (!user) throw new Error("Invalid Credentials");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error("Invalid Credentials");

        // Generate a new token and set in cookies
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true, // Prevent client-side access
            secure: true, // Use 'true' in production (HTTPS)
            sameSite: "none", // Required for cross-origin requests
            maxAge: 8 * 3600000, // 8 hours
        });

        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    res.send("You are logged out");
});

authRouter.get("/auth/check", userAuth, async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in auth/check", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = authRouter;
