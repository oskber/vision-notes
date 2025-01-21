import React from 'react';
import SingleNote from './SingleNote';
import {useNotes} from '@/app/context/NotesContext';
import {SingleNoteComponentProps} from '@/app/types/note';


const Notes: React.FC = () => {
    const {notes, deleteNote} = useNotes();

    const mappedNotes: SingleNoteComponentProps[] = notes.map((note) => ({
        id: note._id,
        title: note.title,
        content: note.content,
        onDelete: deleteNote,
        createdAt: note.createdAt,
    }));


    return (
        <div className="flex justify-center p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
>
                {mappedNotes.map((note) => (
                    <SingleNote key={note.id} {...note} />
                ))}
            </div>
        </div>
    );
};

export default Notes;