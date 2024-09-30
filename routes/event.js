const express = require("express");

const eventController = require("../controllers/event");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/create", authMiddleware, eventController.createEvent);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);

module.exports = router;
