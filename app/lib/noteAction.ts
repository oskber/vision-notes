'use server';

import connectDB from '@/app/lib/connectDB';
import Note from '@/app/models/noteModel';
import { Document } from 'mongoose';
import {revalidatePath} from 'next/cache';

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

export async function fetchNotes(): Promise<NoteType[]> {
    try {
        await connectDB();
        const notes = await Note.find({}).lean<NoteDocument[]>();
        return notes.map(note => ({
            id: note._id.toString(),
            title: note.title,
            content: note.content,
        }));
    } catch (error) {
        throw new Error((error as Error).message);
    }

}

export const createNote = async (title: string, content: string) => {
    const note = new Note({ title, content });

    try {
        await connectDB();
        await note.save();
        console.log("Note created successfully");
        revalidatePath('/');
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const deleteNote = async (id: string) => {
    try {
        await connectDB();
        await Note.deleteOne
        ({_id: id});
        console.log("Note deleted successfully");
        revalidatePath('/');
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const editNote = async (id: string, title: string, content: string) => {
    try {
        await connectDB();
        await Note.updateOne({ _id: id }, { title, content });
        console.log("Note updated successfully");
        revalidatePath('/');
    } catch (error) {
        throw new Error((error as Error).message);
    }
}