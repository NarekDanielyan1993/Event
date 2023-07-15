import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

import {
    NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD,
    NODEMAILER_PROVIDER,
} from 'constant';
import { connectDB } from 'lib';
import {
    CustomDate,
    getEmailContent,
    getEmailSubject,
    handleError,
} from 'utils';

const subscribersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
});

subscribersSchema.statics.sendNotification = async function (event) {
    try {
        await connectDB();
        const transporter = nodemailer.createTransport({
            service: NODEMAILER_PROVIDER,
            secure: true,
            auth: {
                user: NODEMAILER_EMAIL,
                pass: NODEMAILER_PASSWORD,
            },
        });

        let subscriptions = await this.find();
        subscriptions = subscriptions.map((item) => item.email);
        if (Array.isArray(subscriptions) && subscriptions.length > 0) {
            const emailPromises = subscriptions.map((recipient) =>
                transporter.sendMail({
                    from: process.env.NODEMAILER_EMAIL,
                    to: recipient,
                    subject: getEmailSubject(),
                    html: getEmailContent(
                        CustomDate.formatDate(event.date),
                        event.location,
                        event._id,
                        recipient
                    ),
                })
            );

            await Promise.all(emailPromises);
        }
    } catch (error) {
        console.error(
            'An error occurred while sending the email to : <a href=`${eventLink}`></a>',
            error
        );
        throw error;
    }
};

subscribersSchema.statics.storeEmail = async function (data) {
    try {
        await connectDB();
        const newSubscription = await this.create(data);

        return newSubscription;
    } catch (error) {
        console.error('Error accured while unsubscribing from email.');
        throw error;
    }
};

subscribersSchema.statics.deleteEmail = async function (email) {
    try {
        await connectDB();
        const deletedSubscriptionEmail = await this.deleteMany({ email });

        return deletedSubscriptionEmail;
    } catch (error) {
        console.error('Error accured while unsubscribing from email.');
        throw error;
    }
};

subscribersSchema.statics.getAllSubscribers = async function (res) {
    try {
        await connectDB();
        const subscriptions = await this.find({}, 'email');

        return subscriptions;
    } catch (error) {
        handleError(error, res);
    }
};

subscribersSchema.statics.getSubscriber = async function (email) {
    try {
        await connectDB();
        const subscriber = await this.findOne({ email });
        return subscriber;
    } catch (error) {
        console.error('Error accured while geting email');
        throw error;
    }
};

const Subscriber =
    mongoose.models.Subscriber ||
    mongoose.model('Subscriber', subscribersSchema);

export default Subscriber;
