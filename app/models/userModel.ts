import { Document, model, models, Schema} from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
    name?: string;
}

const UserSchema = new Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;