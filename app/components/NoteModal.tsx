import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {createNote, editNote} from '@/app/actions/noteAction';
import { useNotes } from '@/app/context/NotesContext';

interface NoteModalProps {
    onClose: () => void;
    initialText?: string;
    initialTitle?: string;
    initialNoteId?: string;
}

export default function NoteModal({ onClose, initialText = '', initialTitle = '', initialNoteId }: NoteModalProps) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialText);
    const { notes, setNotes } = useNotes();

    const handleSaveText = async () => {
        try {
            if (!initialNoteId) {
                // Create a new note
                const newNote = await createNote(title, content);
                setNotes([...notes, newNote]); // Add the new note to the state
                console.log('Note created successfully:', newNote);
            } else {
                // Edit an existing note
                await editNote(initialNoteId, title, content); // Use the server-side `editNote` function
                const updatedNotes = notes.map((note) =>
                    note._id === initialNoteId
                        ? { ...note, title, content } // Update the note locally
                        : note
                );
                setNotes(updatedNotes); // Update the context with the modified note
                console.log('Note updated successfully');
            }

            onClose(); // Close the modal after saving
        } catch (error) {
            console.error('Error saving note:', error);
            alert('An error occurred while saving the note. Please try again.');
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-500">
                    {initialNoteId ? 'Edit Note' : 'Create Note'}
                </h2>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await handleSaveText();
                    }}
                >
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full p-2 mt-2 border border-gray-300 rounded-md text-black"
                    />
                    <textarea
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        className="w-full h-32 p-2 mt-2 border border-gray-300 rounded-md text-black"
                    />
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-white bg-gray-500 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded-md ml-2"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}