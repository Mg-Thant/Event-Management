const Event = require("../models/event");

// organizer only
exports.createEvent = async (req, res) => {
  const { name, date, location, description, ticketsAvailable } = req.body;

  try {
    const event = await Event.create({
      name,
      date,
      location,
      description,
      organizer: req.user.id,
      ticketsAvailable,
    });

    return res.status(201).json({
      event,
      success: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to create event", success: false });
  }
};

// public
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    if (!events) {
      throw new Error("Events not found!!!");
    }

    return res.json({
      events,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getEventById = async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error("Event not found!!!");
    }

    return res.json(event);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
