import React from 'react';
import SingleNote, { SingleNoteProps } from './SingleNote';
import { deleteNote } from '@/app/lib/noteAction';
import { useNotes } from '@/app/context/NotesContext';

interface NotesProps {
    notes: SingleNoteProps[];
}

const Notes: React.FC<NotesProps> = () => {
    const { notes, setNotes } = useNotes();
    const handleDeleteNote = async (id: string) => {
        try {
            await deleteNote(id);
            setNotes(notes.filter((note) => note.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex justify-center items-center p-10">
            <div className="flex flex-grow gap-4 flex-wrap justify-center">
                {notes.map((note) => (
                   <SingleNote key={note.id} {...note} onDelete={handleDeleteNote} />
                ))}
            </div>
        </div>
    );
};

export default Notes;