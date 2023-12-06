import mongoose from 'mongoose';

import { EVENTS_QUERY_PARAMS } from 'constant';
import { connectDB } from 'lib';
import { CustomDate } from 'utils';

const eventSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    imageId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

eventSchema.statics.getAllEvents = async function () {
    try {
        await connectDB();
        const events = await this.find();

        return JSON.parse(JSON.stringify(events));
    } catch (err) {
        console.error('Error accured while retrieving all events');
        throw err;
    }
};

eventSchema.statics.getPaginatedEventsByCategory = async function ({
    categoryType,
    userId,
    offset = 0,
    limit,
    sort = 1,
    filter,
    filterBy,
}) {
    try {
        await connectDB();
        const eventsByCategory = {
            labels: [
                EVENTS_QUERY_PARAMS.CATEGORY_TYPE.ALL.label,
                EVENTS_QUERY_PARAMS.CATEGORY_TYPE.MY.label,
                EVENTS_QUERY_PARAMS.CATEGORY_TYPE.OTHER.label,
            ],
            data: [],
        };
        let sortedData = [];

        let query = {};
        const type = parseInt(categoryType);

        let startDate;
        let endDate;
        if (filter) {
            if (filterBy === 'date') {
                startDate = CustomDate.getStartOfMonth(filter);
                endDate = CustomDate.getEndOfMonth(startDate);
                query = { ...query, date: { $gte: startDate, $lte: endDate } };
            }
        }
        if (type === EVENTS_QUERY_PARAMS.CATEGORY_TYPE.MY.code) {
            query.userId = userId;
        }
        if (type === EVENTS_QUERY_PARAMS.CATEGORY_TYPE.OTHER.code) {
            query.userId = { $ne: userId };
        }

        if (limit) {
            sortedData = await this.find(query)
                .sort({ date: sort })
                .skip(offset)
                .limit(limit);
        } else {
            sortedData = await this.find(query)
                .sort({ date: sort })
                .skip(offset);
        }

        const totalCount = await this.countDocuments(query);

        eventsByCategory.data = sortedData;
        eventsByCategory.totalCount = totalCount;
        return JSON.parse(JSON.stringify(eventsByCategory));
    } catch (err) {
        console.error('Error occurred while retrieving all events');
        throw err;
    }
};

eventSchema.statics.getEventById = async function (id) {
    try {
        await connectDB();
        const event = await this.findById(id);

        return JSON.parse(JSON.stringify(event));
    } catch (err) {
        console.error('Error accured while getting event');
        throw err;
    }
};

eventSchema.statics.getUpcamingEvents = async function (sort = 1) {
    try {
        await connectDB();
        const events = await this.find().sort({ date: sort });
        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.error('Error accured while getting upcaming events');
        throw error;
    }
};

eventSchema.statics.createEvent = async function (eventData = {}) {
    try {
        await connectDB();

        return this.create(eventData);
    } catch (error) {
        console.error('Error accured while creating event');
        throw error;
    }
};

eventSchema.statics.createMultipleEvents = async function (eventData = []) {
    try {
        await connectDB();
        const createdEvent = await this.create(eventData);

        return createdEvent;
    } catch (error) {
        console.error('Error accured while creating events');
        throw error;
    }
};

eventSchema.statics.updateEvent = async function (id, eventData, options) {
    try {
        await connectDB();
        const updatedEvent = await this.findByIdAndUpdate(id, eventData, {
            new: true,
            ...options,
        });
        return updatedEvent;
    } catch (error) {
        console.error('Error accured while updating events');
        throw error;
    }
};

eventSchema.statics.deleteEventById = async function (id) {
    try {
        await connectDB();
        const deletedEvent = await this.findOneAndDelete({ _id: id });

        return deletedEvent;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

eventSchema.statics.getEventsByDate = async function (
    dateIsoString,
    typeId,
    userId
) {
    try {
        await connectDB();

        const startDate = CustomDate.getStartOfMonth(dateIsoString);
        const endDate = CustomDate.getEndOfMonth(startDate);
        let events = [];
        if (typeId === '0') {
            events = await this.find({
                date: { $gte: startDate, $lte: endDate },
            }).sort({ date: 1 });
        }
        if (typeId === '1') {
            events = await this.find({
                date: { $gte: startDate, $lte: endDate },
                userId: userId,
            }).sort({ date: 1 });
        }
        if (typeId === '2') {
            events = await this.find({
                date: { $gte: startDate, $lte: endDate },
                userId: { $ne: userId },
            }).sort({ date: 1 });
        }

        return events;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
};

const Event =
    mongoose.models.Event || mongoose.model('Event', eventSchema, 'events');

export default Event;
