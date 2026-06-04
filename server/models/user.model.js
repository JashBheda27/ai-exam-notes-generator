import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  credits: {
    type: Number,
    required: true,
    default: 50,
    min:0
  },
  iscreditAvailable: {
    type: Boolean,
    required: true,
    default: true
  },
  notes:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Notes',
    default: []
  }
},{ timestamps: true }); 

const UserModel = mongoose.model("User", userSchema);

export default UserModel;