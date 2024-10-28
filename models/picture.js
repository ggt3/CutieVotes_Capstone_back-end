import mongoose from "mongoose";

const pictureSchema = new mongoose.Schema({

  url: {
    type: String,
    required: true,
  },

//   title: {
//     type: String,
//     required: true,
//     trim: true,
//     maxLength: 100,
//   },
  totalLikes: {
    type: Number,
    default: 0,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

export default new mongoose.model("Picture", pictureSchema);
