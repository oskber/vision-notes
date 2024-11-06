'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SingleNoteProps } from '@/app/components/SingleNote';

interface NotesContextProps {
    notes: SingleNoteProps[];
    setNotes: React.Dispatch<React.SetStateAction<SingleNoteProps[]>>;
}

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<SingleNoteProps[]>([]);
    return (
        <NotesContext.Provider value={{ notes, setNotes }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
};