const User = require("../models/user");

//registered user
const registeredUser = async (req, res, next) => {
    try {
        const { name, email, mobile, eventSessions } = req.body;

        if (!name || !email || !mobile || !eventSessions) {
            res.status(400);
            return next(new Error("All fields are required"));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400);
            return next(new Error("User already exists"));
        }

        const newUser = await User.create({ name, email, mobile, eventSessions });
        
        res.status(200).json({
            status: "SUCCESS",
            message: "You are Registered Successfully.",
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            mobile: newUser.mobile,
            eventSessions: newUser.eventSessions,
        })
    } catch (error) {
        res.status(400);
        next(new Error(error.message));
    }

}

module.exports = { registeredUser }