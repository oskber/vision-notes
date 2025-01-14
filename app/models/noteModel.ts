import mongoose, {model, models} from 'mongoose';

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
});

const Note = models.Note || model('Note', NoteSchema);

export default Note;