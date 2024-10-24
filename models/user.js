import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true, //optimize query to usernames
    minLength: 3,
    maxLength: 16,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 18,
  },
  firstName: String,
  lastName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likedPictures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Picture",
    },
  ],
});

userSchema.plugin(uniqueValidator);
export default new mongoose.model("User", userSchema);
