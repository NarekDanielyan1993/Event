import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
