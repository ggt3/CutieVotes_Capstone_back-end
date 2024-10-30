import express from "express";
import User from "../models/User.js";

const userRouter = new express.Router();

//get all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log("getting users");
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

//create a new user
userRouter.post('/new', async (req,res) => {
    try{
        const newUser = await User.create(req.body)
   
    if (newUser) {
        res.status(201).json({ user: newUser });
      } else {
        res.status(400).json({ message: "Error creating new user" });
      }
    } catch (error) {
      next(error);
    }
  });

//get all photos that a user liked
userRouter.get("/:username/liked", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate("likedPictures")
      .exec();
    console.log("finding user: ", req.params.username);
    if (!user) {
      throw new Error("User not found");
    }
    return user.likedPictures;
  } catch (error) {
    console.log("error getting user likes",error);
  }
});

//edit user info - email or name or password but not username
userRouter.patch("/:username", async (req, res) => {
  try {
    const updatedUser = User.findOneAndUpdate(
      { username: req.params.username },
      { email: req.params.email, password: req.params.password, firstName: req.params.firstName, lastName: req.params.lastName,  },
      { new: true, runValidators: true }
    );
    console.log("Updated User:", updatedUser)
    return updatedUser;
  } catch (error) {
    console.log("Error updating user:", error);
  }
});

//delete account
userRouter.delete("/:username", async (req, res) => {
    try {
      const deleted = User.findOneAndDelete(
        { username: req.params.username }
      );
      res.send({
        deletedUser: deleteUser,
        message: 'User Deleted!'
    })
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  });

export default userRouter;
