const { Schema, model } = require("mongoose");

const ticketSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  ticketNumber: { type: Number, required: true },
});

module.exports = model("Ticket", ticketSchema);