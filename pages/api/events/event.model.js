import mongoose from 'mongoose';

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

eventSchema.statics.getEventsByCategory = async function (userId) {
    try {
        console.log('userId', userId);
        await connectDB();
        const allEvents = await this.find();
        console.log('allEvents', allEvents);
        const myEvents = allEvents.filter(
            (event) => event.userId.toString() === userId
        );
        const otherEvents = allEvents.filter(
            (event) => event.userId.toString() !== userId
        );

        const eventsByCategory = [
            { label: 'All', data: allEvents, id: 0 },
            { label: 'My', data: myEvents, id: 1 },
            { label: 'Other', data: otherEvents, id: 2 },
        ];

        return JSON.parse(JSON.stringify(eventsByCategory));
    } catch (err) {
        console.error('Error accured while retrieving all events');
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

eventSchema.statics.getUpcamingEvents = async function () {
    try {
        await connectDB();
        const events = await this.find().sort({ date: 1 });
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
