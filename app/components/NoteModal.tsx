import React, {useState} from 'react';
import {createPortal} from 'react-dom';
import {createNote} from '@/app/lib/noteAction';

interface TextModalProps {
    onClose: () => void,
    onSave?: (title: string, text: string) => void
}

export default function TextModal({onClose}: TextModalProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-500">Edit Note</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await createNote(title, content);
                    onClose();
                }}>
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
                        className="w-full h-32 p-2 mt-2 border border-gray-300 rounded-md text-black"
                    />
                    <div className="flex justify-end mt-4">
                        <button type="button" onClick={onClose}
                                className="px-4 py-2 text-white bg-gray-500 rounded-md">Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md ml-2">Save</button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}