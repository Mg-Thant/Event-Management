const express = require("express");

const ticketController = require("../controllers/ticket");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/book", authMiddleware, ticketController.bookTicket);

module.exports = router;
