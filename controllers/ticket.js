const Ticket = require("../models/ticket");
const Event = require("../models/event");

exports.bookTicket = async (req, res) => {
  const { eventId } = req.body;
  try {
    const event = await Event.findById(eventId);

    if (!event || event.ticketsSold >= event.ticketsAvailable) {
      return res.status(400).json({
        success: false,
        error: "Tickets are sold out or event not found",
      });
    }

    const ticket = await Ticket.create({
      user: req.user.id,
      event: eventId,
      ticketNumber: event.ticketsSold + 1,
    });

    event.ticketsSold += 1;
    await event.save();

    return res.status(201).json({
      ticket,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Ticket booking Failed",
    });
  }
};
