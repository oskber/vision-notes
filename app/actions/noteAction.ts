'use server';

import {revalidatePath} from 'next/cache';
import {auth} from '@/auth';
import connectDB from '@/app/lib/connectDB';
import Note, {NoteDocument} from '@/app/models/noteModel'
import {SingleNoteProps} from '@/app/types/note';

export async function fetchNotes(): Promise<SingleNoteProps[]> {
    try {
        await connectDB();

        const session = await auth();
        if (!session?.user) {
            throw new Error('User not authenticated');
        }

        const notes = await Note.find({userId: session.user.id}).lean<NoteDocument[]>();

        return notes.map((note) => ({
            _id: note._id.toString(),
            title: note.title,
            content: note.content,
            userId: note.userId,
            createdAt: note.createdAt.toString(),
            updatedAt: note.updatedAt.toString(),
        }));
    } catch (error) {
        throw error;
    }
}

export const createNote = async (title: string, content: string): Promise<SingleNoteProps> => {
    try {
        await connectDB();

        const session = await auth();
        if (!session?.user) {
            throw new Error('User not authenticated');
        }

        const note = await Note.create({
            userId: session.user.id,
            title,
            content,
            createdAt: new Date(),
        });


        return {
            _id: note._id.toString(),
            userId: note.userId,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        };
    } catch (error) {
        console.error('Error creating note:', error);
        throw new Error('Failed to create note');
    }
};

export const deleteNote = async (id: string): Promise<void> => {
    try {
        await connectDB();

        const session = await auth();
        if (!session?.user) {
            throw new Error('User not authenticated');
        }

        const deletedNote = await Note.findOneAndDelete({
            _id: id,
            userId: session.user.id,
        });

        if (!deletedNote) {
            throw new Error('Note not found or not authorized to delete');
        }

        revalidatePath('/');
    } catch (error) {
        console.error('Error deleting note:', error);
        throw new Error('Failed to delete note');
    }
};

export const editNote = async (id: string, title: string, content: string): Promise<void> => {
    try {
        await connectDB();

        const session = await auth();
        if (!session?.user) {
            throw new Error('User not authenticated');
        }


        const updatedNote = await Note.findOneAndUpdate(
            {_id: id, userId: session.user.id},
            {title, content},
            {new: true}
        );

        if (!updatedNote) {
            throw new Error('Note not found or not authorized to edit');
        }


        revalidatePath('/');
    } catch (error) {
        console.error('Error editing note:', error);
        throw new Error('Failed to edit note');
    }
};