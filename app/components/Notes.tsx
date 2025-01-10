import React from 'react';
import SingleNote, { SingleNoteProps } from './SingleNote';
import { deleteNote } from '@/app/lib/noteAction';

interface NotesProps {
    notes: SingleNoteProps[];
}

const Notes: React.FC<NotesProps> = ({ notes }) => {
    const handleDeleteNote = async (id: string) => {
        try {
            await deleteNote(id);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {notes.map((note) => (
                <SingleNote key={note.id} {...note} onDelete={handleDeleteNote} />
            ))}
        </div>
    );
};

export default Notes;