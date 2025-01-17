import React from 'react';

export type NotesApiResponse =
    | { success: true; data: SingleNoteProps[] }
    | { success: false; error: string };

export interface SingleNoteComponentProps {
    id: string;
    title: string;
    content: string;
    onDelete: (id: string) => void;
}

export interface SingleNoteProps {
    _id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}


export interface NotesContextProps {
    notes: SingleNoteProps[];
    setNotes: React.Dispatch<React.SetStateAction<SingleNoteProps[]>>;
    deleteNote: (id: string) => void;
    editNote: (id: string, newTitle: string, newContent: string) => void;
    error: string | null;
    loading: boolean;
}

interface ApiResponse {
    success: boolean;
    data: NoteDocument[];
    error?: string;
}