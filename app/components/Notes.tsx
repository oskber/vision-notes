import React, {useEffect, useState} from 'react';
import SingleNote, { SingleNoteProps } from './SingleNote';
import {fetchNotes} from '@/app/lib/noteAction';


export default function Notes() {

    const [notes, setNotes] = useState<SingleNoteProps[]>([]);

    useEffect(() => {
        async function getNotes() {
            const fetchedNotes = await fetchNotes();
            setNotes(fetchedNotes);
        }
        getNotes().then(r => console.log(r));
    }, []);



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note, index) => (
                <SingleNote key={index} {...note} />
            ))}
        </div>
    );
}