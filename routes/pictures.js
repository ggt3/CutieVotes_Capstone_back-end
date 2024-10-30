import express from "express";
import Picture from "../models/picture.js";
import User from "../models/User.js";
const pictureRouter = new express.Router();

pictureRouter.get("/test", (req, res) => {
  res.send("hi you've reached the picture router");
});

//get all pictures
pictureRouter.get("/", async (req, res) => {
  try {
    const pictures = await Picture.find();
    console.log("getting pictures");
    res.send(pictures);
  } catch (error) {
    console.log(error);
  }
});
pictureRouter.get("/top", async (req, res) => {
  try {
    const pictures = await Picture.find().sort({ totalLikes: -1 }).limit(20);
    console.log("top 20 pics");
    res.send(pictures);
  } catch (error) {
    console.log(error);
  }
});

//add a picture
//check if there are date.now pictures - if not pull from cat api, if yes return the 3
pictureRouter.get("/add", async (req, res) => {
  try {
    const today = new Date();

    const picturesToday = Picture.find({ dateAdded: today.getDate() });
    console.log("TODAYS DATE", today.getDate());
    if (picturesToday.size > 0) {
      res.send(picturesToday);
    } else {
      //there are no pictures from today, seed from api
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );
      const picturesArr = await response.json();

      const picsDoc = picturesArr.map((item) => ({
        url: item.url,
        totalLikes: 0,
      }));
      console.log(picsDoc);
      const status = await Picture.insertMany(picsDoc);
      res.send(status);
      console.log("inserted pictures to db ");
    }
    // const pictures = new Picture.create(req.body);

    // res.send(pictures);
  } catch (error) {
    console.error("error saving pictures", error);
  }
});

//for testing on stable entries
pictureRouter.get("/add/static", async (req, res) => {
  try {
    const pictures = await Picture.find().sort({ x: 1 }).limit(2); //2 oldest to newest entries
    res.send(pictures);
  } catch (e) {
    console.error("error");
  }
});

//add a vote to a picture - send user in the request
pictureRouter.post("/:id/upvote", async (req, res) => {
  try {
    const user = req.query.user;
    const pictureId = req.params.id;
    if (user) {
      const updatedUser = await User.findOneAndUpdate(
        { username: user },
        { $addToSet: { likedPictures: pictureId } }, // Add pictureId to likedPictures
        { new: true } // Return the updated document
      );
      console.log("added to liked photos of ", updatedUser)
    }

    const updatedPicture = await Picture.findByIdAndUpdate(
      pictureId, // The ID of the picture to update
      { $inc: { totalLikes: 1 } }, // Increment likes by 1
      { new: true } // Return the updated document
    );

    if (!updatedPicture) {
      console.log("Picture not found");
      res.status(404).send("picture not found");
      return null;
    }

    console.log("adding vote to picture:", req.params.id);
    res.send(updatedPicture);
  } catch (error) {
    console.log("error adding vote", error);
  }
});

export default pictureRouter;
