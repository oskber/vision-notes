import React from 'react';
import SingleNote from './SingleNote';
import { useNotes } from '@/app/context/NotesContext';
import { SingleNoteComponentProps } from '@/app/types/note';

interface NotesProps {
    notes: SingleNoteComponentProps[];
}

const Notes: React.FC<NotesProps> = () => {
    const { notes, deleteNote } = useNotes();


    return (
        <div className="flex justify-center items-center p-10">
            <div className="flex flex-grow gap-4 flex-wrap justify-center">
                {notes.map((note) => (
                   <SingleNote key={note._id}
                               id={note._id}
                               title={note.title}
                               content={note.content}
                               onDelete={deleteNote} />
                ))}
            </div>
        </div>
    );
};

export default Notes;