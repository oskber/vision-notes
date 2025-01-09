'use server';

import connectDB from '@/app/lib/connectDB';
import Note from '@/app/models/noteModel';
import { Document } from 'mongoose';
import {revalidatePath} from 'next/cache';
import {v4 as uuidV4} from 'uuid';

interface NoteType {
    id: string;
    title: string;
    content: string;
}

interface NoteDocument extends Document {
    id: string;
    title: string;
    content: string;
}

export async function fetchNotes(): Promise<NoteType[]> {
    try {
        await connectDB();
        const notes = await Note.find({}).lean<NoteDocument[]>();
        return notes.map(note => ({
            id: uuidV4(),
            title: note.title,
            content: note.content,
        }));
    } catch (error) {
        throw new Error((error as Error).message);
    }

}

export const createNote = async (title: string, content: string) => {
    const note = new Note({ id: uuidV4(), title, content });

    try {
        await connectDB();
        await note.save();
        console.log("Note created successfully");
        revalidatePath('/');
    } catch (error) {
        throw new Error((error as Error).message);
    }
}