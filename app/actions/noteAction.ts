'use server';

import { revalidatePath } from 'next/cache';
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

        const notes = await Note.find({ userId: session.user.id }).lean<NoteDocument[]>();
        console.log('Notes fetched:', notes);

        return notes.map((note) => ({
            _id: note._id.toString(), // Convert _id from ObjectId to string
            title: note.title,       // Map title field
            content: note.content,   // Map content field
            userId: note.userId,     // Map userId field
            createdAt: note.createdAt.toString(), // Convert Date to string
            updatedAt: note.updatedAt.toString(), // Convert Date to string
        }));
    } catch (error) {
        console.error('Error fetching notes:', error);
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

        // Create a new note in the database
        const note = await Note.create({
            userId: session.user.id,
            title,
            content,
            createdAt: new Date(),
        });

        // Return the created note
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

        // Delete the note by its ID and ensure it belongs to the logged-in user
        const deletedNote = await Note.findOneAndDelete({
            _id: id,
            userId: session.user.id,
        });

        if (!deletedNote) {
            throw new Error('Note not found or not authorized to delete');
        }

        // Revalidate cache for updated UI
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

        // Update the note by its ID and ensure it belongs to the logged-in user
        const updatedNote = await Note.findOneAndUpdate(
            { _id: id, userId: session.user.id }, // Filter by ID and ensure the user owns the note
            { title, content }, // Update fields
            { new: true } // Return the updated document
        );

        if (!updatedNote) {
            throw new Error('Note not found or not authorized to edit');
        }

        // Revalidate cache for updated UI
        revalidatePath('/');
    } catch (error) {
        console.error('Error editing note:', error);
        throw new Error('Failed to edit note');
    }
};