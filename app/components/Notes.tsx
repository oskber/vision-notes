import React from 'react';
import SingleNote, { SingleNoteProps } from './SingleNote';

interface NotesProps {
    notes: SingleNoteProps[];
}

const Notes: React.FC<NotesProps> = ({ notes }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
                <SingleNote key={note.id} {...note} />
            ))}
        </div>
    );
};

export default Notes;