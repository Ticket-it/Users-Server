// Important requires
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const {
    createRecord,
    readRecord,
    updateRecord,
    deleteRecord,
    getAllRecords,
    getEventsByType,
    getHistoryById
} = require("../utils/CRUD");

/**
 * Function to get all event types
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getEventTypes = async (req, res, next) => {

    try {
        const eventTypes = await getAllRecords("Events-Type");

        res.status(200).send(eventTypes);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * Function to get Events by event type ID
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getEventsByEventsTypeId = async (req, res, next) => {

    try {
        const eventTypeId = req.params.eventTypeId;

        /**
         * Check if type does not exists
         */
        const eventTypePath = `Events-Type/${eventTypeId}`;
        const eventTypeRecord = await readRecord(eventTypePath);

        if (!eventTypeRecord) {
            throw new createError[404]("Event type not found");
        }

        const events = await getEventsByType(eventTypeId);

        res.status(200).send(events);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * Function to book event
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const bookEvent = async (req, res, next) => {

    try {

        const eventId = req.params.eventId;
        const userId = req.params.userId;

        /**
         * Check if user does not exists
         */
        const userPath = `Users/${userId}`;
        const userRecord = await readRecord(userPath);

        if (!userRecord) {
            throw new createError[404]("User not found");
        }

        /**
         * Check if event does not exists
         */
        const eventPath = `Events/${eventId}`;
        const eventRecord = await readRecord(eventPath);

        if (!eventRecord) {
            throw new createError[404]("Event not found");
        }

        if(eventRecord.availableTickets<=0){
            throw new createError[403]("No more available tickets in this event");
        }

        /**
         * Update available tickets
         */
        const eventUpdateRecord = { 
            availableTickets: eventRecord.availableTickets-1,
        };
        await updateRecord(eventPath, eventUpdateRecord);

        // Generate a new UUID
        const ticketId = uuidv4();

        const ticketPath = `Tickets/${ticketId}`;

        /**
         * Create Record
         */
        const ticketData = {
            ticketId: ticketId,
            eventId: eventId,
            userId : userId,
            status: "pending"
        };
        await createRecord(ticketPath, ticketData);

        res.status(200).send({
            sucess: "true",
            ticketId: ticketId,
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};


/**
 * Function to get history
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getHistory = async (req, res, next) => {

    try {

        const userId = req.params.userId;

        /**
         * Check if user does not exists
         */
        const userPath = `Users/${userId}`;
        const userRecord = await readRecord(userPath);

        if (!userRecord) {
            throw new createError[404]("User not found");
        }

        const history=await getHistoryById(userId);

        res.status(200).send({
            history
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    getEventTypes,
    getEventsByEventsTypeId,
    bookEvent,
    getHistory
};
