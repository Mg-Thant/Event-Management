const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticketsAvailable: {
    type: Number,
    required: true,
  },
  ticketsSold: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Event", eventSchema);