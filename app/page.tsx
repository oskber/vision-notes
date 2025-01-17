'use client';

import { useNotes } from '@/app/context/NotesContext';
import SingleNote from '@/app/components/SingleNote';
import {deleteNote} from '@/app/actions/noteAction';

export default function HomePage() {
    const { notes, loading, error } = useNotes();

    if (loading) {
        return <p>Loading...</p>; // Show a loading message while fetching
    }

    if (error) {
        return <p className="text-red">{error}</p>; // Show error if any
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl mb-6">Your Notes</h1>

            {notes.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                    {notes.map((note) => (
                        <SingleNote
                            key={note._id} // Map `_id` to the `key` for React
                            id={note._id} // Pass the note's `_id` as `id` for SingleNote
                            title={note.title} // Pass the title
                            content={note.content} // Pass the content
                            onDelete={deleteNote} // Pass the delete handler
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No notes available</p>
            )}
        </main>
    );
}