import mongoose from "mongoose";

const pictureSchema = new Schema({
  url: {
    type: String,
 
  },
  totalLikes: {
    type: Number,
    default: 0,
   
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  }
});

export default new mongoose.model("User", userSchema);
