import React from 'react';
import SingleNote from './SingleNote';
import { useNotes } from '@/app/context/NotesContext';
import { SingleNoteComponentProps } from '@/app/types/note';


const Notes: React.FC = () => {
    const { notes, deleteNote } = useNotes();

    const mappedNotes: SingleNoteComponentProps[] = notes.map((note) => ({
        id: note._id, // Map `_id` to `id`
        title: note.title,
        content: note.content,
        onDelete: deleteNote,
        createdAt: note.createdAt,
    }));


    return (
        <div className="flex justify-center items-center p-10">
            <div className="flex flex-grow gap-4 flex-wrap justify-center">
                {mappedNotes.map((note) => (
                    <SingleNote key={note.id} {...note} /> // Spread the props
                ))}
            </div>
        </div>
    );
};

export default Notes;