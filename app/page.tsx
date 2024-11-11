'use client';

import Notes from '@/app/components/Notes';
import {useNotes} from '@/app/context/NotesContext';

export default function Home() {
    const {notes} = useNotes();

    return (
        <main>
            <div className="flex flex-col items-center justify-center">
            <div>
                <Notes notes={notes}/>
            </div>
            </div>
        </main>
    );
}