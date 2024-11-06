import React from 'react';
import SingleNote, { SingleNoteProps } from './SingleNote';
interface NotesProps {
    notes: SingleNoteProps[];
}

export default function Notes({ notes }: NotesProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note, index) => (
                <SingleNote key={index} {...note} />
            ))}
        </div>
    );
}