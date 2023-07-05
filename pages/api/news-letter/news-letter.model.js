/* eslint-disable consistent-return */
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

import {
    NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD,
    NODEMAILER_PROVIDER,
} from 'constant';
import { connectDB } from 'lib';
import { getEmailContent, getEmailSubject, handleError } from 'utils';

const subscribersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
});

subscribersSchema.statics.sendNotification = async function (event) {
    try {
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
                    text: getEmailContent(event.date, event.location),
                })
            );

            await Promise.all(emailPromises);
        }
    } catch (error) {
        console.error('An error occurred while sending the email to :', error);
        throw error;
    }
};

subscribersSchema.statics.storeEmail = async function (data, res) {
    try {
        await connectDB();
        const newSubscription = await this.create(data);

        return newSubscription;
    } catch (error) {
        handleError(error, res);
    }
};

// eslint-disable-next-line consistent-return
subscribersSchema.statics.getAllSubscribers = async function getAllSubscribers(
    res
) {
    try {
        await connectDB();
        const subscriptions = await this.find({}, 'email');

        return subscriptions;
    } catch (error) {
        handleError(error, res);
    }
};

const Subscriber =
    mongoose.models.Subscriber ||
    mongoose.model('Subscriber', subscribersSchema);

export default Subscriber;
