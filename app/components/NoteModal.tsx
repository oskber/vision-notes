import React, {useState} from 'react';
import {createPortal} from 'react-dom';
import {createNote, editNote} from '@/app/actions/noteAction';
import {useNotes} from '@/app/context/NotesContext';

interface NoteModalProps {
    onClose: () => void;
    initialText?: string;
    initialTitle?: string;
    initialNoteId?: string;
}

export default function NoteModal({onClose, initialText = '', initialTitle = '', initialNoteId}: NoteModalProps) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialText);
    const {notes, setNotes} = useNotes();

    const handleSaveText = async () => {
        try {
            if (!initialNoteId) {

                const newNote = await createNote(title, content);
                setNotes([...notes, newNote]);
                console.log('Note created successfully:', newNote);
            } else {

                await editNote(initialNoteId, title, content);
                const updatedNotes = notes.map((note) =>
                    note._id === initialNoteId
                        ? {...note, title, content}
                        : note
                );
                setNotes(updatedNotes);
                console.log('Note updated successfully');
            }

            onClose();
        } catch (error) {
            console.error('Error saving note:', error);
            alert('An error occurred while saving the note. Please try again.');
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70">
            <div
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-auto flex flex-col justify-between bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg py-5 px-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
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
                        className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                    />
                    <textarea
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 mb-4 h-32 resize-none"
                    />
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-500 text-white dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white dark:bg-blue-500 ml-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
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