const express = require("express");
const router = express.Router();
const User = require("../models/user");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  email: zod.string().email(),
});

router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // const exisistingUser = await User.findOne({ username: body.username });
    const existingUser = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "user already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    await User.create({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(409).json({ message: "user doesnt exist" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(403).json({ message: "wrong password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );
    const { password: userPassword, _id, ...info } = user._doc;
    const formattedUser = { userId: _id, ...info };

    res.cookie("token", token).status(200).json(formattedUser);
    
    //  return res.status(201).json({message : "login succesfull"});
  } catch (err) {
    res.status(500).json({ message: "internal server error", err });
  }
});

router.get("/logout", async (req, res) => {
  console.log("it is reaching");
  try {
    res.clearCookie("token", { sameSite: "None", secure: true }).status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "internal server error", err });
  }
});

router.get("/refetch",(req,res)=>{
  
    
    const token = req.cookies.token;

      jwt.verify(token, process.env.SECRET_KEY,{},async (err,data)=>{
        if(err){
          return res.status(404).json(err);
        }
        // console.log(user);
      return res.status(200).json(data);
      
})
})



module.exports = router;
