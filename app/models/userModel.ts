import mongoose, {Model} from 'mongoose';

interface IUser extends mongoose.Document {
    username: string;
    password: string;
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;