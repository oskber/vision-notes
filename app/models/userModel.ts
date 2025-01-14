import mongoose, {Model, Schema} from 'mongoose';

interface IUser extends mongoose.Document {
    _id: string,
    username: string;
    password: string;
    githubId: string;
    mongoId: Schema.Types.ObjectId;
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    githubId: {
        type: String,
        required: true,
        unique: true,
    },
    mongoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;