'use server';

import connectDB from '@/app/lib/connectDB';
import Note from '@/app/models/noteModel';
import User from '@/app/models/userModel';
import {revalidatePath} from 'next/cache';
import {getServerSession} from 'next-auth';
import {NoteDocument, NoteType} from '@/app/types/note';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';

export async function fetchNotes(): Promise<NoteType[]> {
    try {
        const session = await getServerSession(authOptions);
        console.log('Session:', session);
        if (!session || !session.user || !session.user.id) {
            throw new Error('Unauthorized');
        }
        await connectDB();
        const user = await User.findOne({githubId: session.user.id});
        if (!user) {
            throw new Error('User not found');
        }
        const userId = user.mongoId;
        const notes = await Note.find({user: userId}).lean<NoteDocument[]>();
        console.log('Notes:', notes);
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
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
        throw new Error('Unauthorized');
    }

    await connectDB();
    const user = await User.findOne({githubId: session.user.id});
    if (!user) {
        throw new Error('User not found');
    }

    const userId = user.mongoId;
    const note = new Note({title, content, user: userId});

    try {
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
        const note = await Note.findById(id);
        if (!note) {
            console.error(`Note with id ${id} not found`);
            return;
        }
        const result = await Note.updateOne({_id: id}, {title, content});
        if (result.modifiedCount === 0) {
            console.error(`Note with id ${id} was not updated`);
        } else {
            console.log('Note updated successfully');
        }
        revalidatePath('/');
    } catch (error) {
        throw new Error((error as Error).message);
    }
}