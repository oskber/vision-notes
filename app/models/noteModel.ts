import mongoose, {  model, models } from 'mongoose';

const NoteSchema = new mongoose.Schema({
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