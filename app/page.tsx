'use client';

import AddButton from '@/app/components/AddButton';
import Notes from '@/app/components/Notes';
import {useNotes} from '@/app/context/NotesContext';

export default function Home() {
    const {notes} = useNotes();

    return (
        <main>
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-between w-full px-6">
                    <h1 className="text-3xl text-center mt-8 mb-5 flex-grow">
                        <strong>vision</strong> notes
                    </h1>
                    <AddButton/>
                </div>
                <div>
                    <Notes notes={notes}/>
                </div>

            </div>
        </main>
    );
}