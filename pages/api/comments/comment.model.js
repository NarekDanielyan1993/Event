import mongoose, { Schema } from 'mongoose';

import { connectDB } from 'lib';

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    text: {
        type: String,
    },
    eventId: {
        type: Schema.Types.ObjectId,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

commentSchema.statics.getCommentsByEvent = async function (eventId) {
    await connectDB();
    const comments = await this.find({ eventId });

    return JSON.parse(JSON.stringify(comments));
};

commentSchema.statics.deleteCommentsByEvent =
    async function deleteCommentsByEvent(eventId) {
        await connectDB();
        const comments = await this.deleteMany({ eventId });

        return JSON.parse(JSON.stringify(comments));
    };

const Comment =
    mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default Comment;
