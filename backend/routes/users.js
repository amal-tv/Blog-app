const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");
const  zod = require('zod');
const verifyToken = require('../verifyToken');

 const updateSchema = zod.object({

  
    username: zod.string().optional(),
    password: zod.string().optional(),
    email: zod.string().email().optional()

  })





router.put('/:id',verifyToken,async(req,res)=>{
 try{
   
    const result = updateSchema.safeParse(req.body);
    if(!result.success){
      return res.status(400).json({message:"Invalid request body"})
    }
    
   const {username,password,email} = req.body;
   let updatedUser;
   if(password){
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     updatedUser =  await User.findByIdAndUpdate(req.params.id, { username, email, password: hashedPassword }, { new: true });
   }else{

     updatedUser =     await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
   }


   res.status(200).json({ message: 'User updated successfully', updatedUser});

   
   
}catch(err){
 res.status(500).json({message:err.message})
}
   
   
})

router.delete('/:id',verifyToken, async (req, res) => {
  try {
    // Delete the user
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Delete related posts and comments
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });

    res.status(200).json({ msg: "User and related posts/comments have been deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});
  
router.get('/:id',async(req,res)=>{
  try{

          const user = await User.findOne({_id : req.params.id}).select('-password');



          res.status(200).json(user);


  }catch(err){
    res.status(500).json({msg : "intenal server error"});
  }
})



module.exports = router;