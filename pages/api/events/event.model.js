import mongoose, { Schema } from 'mongoose';

import { connectDB } from 'lib';

const eventSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    imageId: {
        type: Schema.Types.ObjectId,
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
});

eventSchema.statics.getAllEvents = async function getAllEvents() {
    await connectDB();
    const event = await this.find();

    return JSON.parse(JSON.stringify(event));
};

eventSchema.statics.getEventById = async function getEventById(id) {
    await connectDB();
    const eventById = await this.findById(id);

    return JSON.parse(JSON.stringify(eventById));
};

eventSchema.statics.getUpcamingEvents = async function getUpcamingEvents() {
    await connectDB();
    const events = await this.find().limit(3).sort({ date: 1 });

    return JSON.parse(JSON.stringify(events));
};

eventSchema.statics.createEvent = async function createEvent(eventData = {}) {
    await connectDB();

    return this.create(eventData);
};

eventSchema.statics.createMultipleEvents = async function createMultipleEvents(
    eventData = []
) {
    await connectDB();
    const createdEvent = await this.create(eventData);

    return createdEvent;
};

eventSchema.statics.updateEvent = async function updateEvent(
    id,
    eventData,
    options
) {
    await connectDB();
    const updatedEvent = await this.findByIdAndUpdate(id, eventData, {
        new: true,
        ...options,
    });

    return updatedEvent;
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

const Event =
    mongoose.models.Event || mongoose.model('Event', eventSchema, 'events');

export default Event;
