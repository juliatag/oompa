const mongoose = require("mongoose");

const ChoresCompletedSchema = new mongoose.Schema({
  chores_uid: {
    type: String,
    required: true,
  },
  parent_uid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  kids_uid: {
    type: String,
    required: true,
  },
  completed_date: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});

const ChoresCompleted = mongoose.model("Chores_Completed", ChoresCompletedSchema);
module.exports = ChoresCompleted;
