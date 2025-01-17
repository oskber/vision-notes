import { Document, model, models, Schema} from 'mongoose';

interface IUser extends Document {
    email: string;
    password?: string;
    name?: string;
    githubId?: string;
}

const UserSchema = new Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    githubId: {type: String, required: false, unique: true, sparse: true},
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;