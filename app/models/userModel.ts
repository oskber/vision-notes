import { Document, model, models, Schema} from 'mongoose';

interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
    name?: string;
    githubId?: string;
}

const UserSchema = new Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    githubId: {type: String, required: false, unique: true, sparse: true},
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;