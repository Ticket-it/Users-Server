const userControllers = require("../controllers/user.controller");
const express = require('express');
const router = express.Router();


// To get all event types
router.route("/event-types").get(userControllers.getEventTypes);

// To get all events by event type ID
router.route("/events/:eventTypeId").get(userControllers.getEventsByEventsTypeId);

// To book an event
router.route("/events/book/:eventId/:userId").get(userControllers.bookEvent);

// To get all event types
router.route("/history/:userId").get(userControllers.getHistory);

/**
 * Todo get tickets and ticket details by userid
 */


module.exports = router;