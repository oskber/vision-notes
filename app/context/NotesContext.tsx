'use client';

import React, { createContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { NotesContextProps, SingleNoteProps } from '@/app/types/note';
import { deleteNote as deleteNoteFromBackend, fetchNotes } from '@/app/actions/noteAction';

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<SingleNoteProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        const loadNotes = async () => {
            try {
                setLoading(true);
                const notes = await fetchNotes();
                const sortedNotes = notes.sort((a, b) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                })
                setNotes(sortedNotes);
                setError(null);
            } catch (error) {
                console.error('Error loading notes:', error);
                setError('Failed to load notes. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (status === 'authenticated') {
            loadNotes();
        } else if (status === 'unauthenticated') {
            setNotes([]);
        }

        return () => setNotes([]);
    }, [session, status]);

    const deleteNote = async (id: string) => {
        try {
            await deleteNoteFromBackend(id);
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const editNote = (id: string, newTitle: string, newContent: string) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note._id === id ? { ...note, title: newTitle, content: newContent } : note
            )
        );
    };

    return (
        <NotesContext.Provider value={{ notes, setNotes, deleteNote, editNote, loading, error }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const context = React.useContext(NotesContext);
    if (!context) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
};