import {Document} from 'mongoose';

interface NoteType {
    id: string;
    title: string;
    content: string;
}

interface NoteDocument extends Document {
    _id: string;
    title: string;
    content: string;
}