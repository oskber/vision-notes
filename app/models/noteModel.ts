import mongoose, {Schema, Document, InferSchemaType, Types} from 'mongoose';

export interface NoteDocument extends Document {
    _id: Types.ObjectId;
    updatedAt: string;
    createdAt: string;
    title: string;
    content: string;
    userId: string;
}

const NoteSchema = new Schema<NoteDocument>(
    {
        title: { type: String, required: false },
        content: { type: String, required: true },
        userId: { type: String, required: true },
    },
    { timestamps: true }
);

export type NoteType = InferSchemaType<typeof NoteSchema>;

export default mongoose.models.Note || mongoose.model<NoteDocument>('Note', NoteSchema);