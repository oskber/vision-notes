import React, { useState } from 'react';
import { createPortal } from 'react-dom';

interface TextModalProps {
    onClose: () => void;
    OnSave: (title: string, text: string) => void;
}

export default function TextModal({ onClose, OnSave }: TextModalProps) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const handleSave = () => {
        OnSave(title, text);
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Edit Note</h2>
                <input
                type={text}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={"Title"}
                className={"w-full p-2 mt-2 border border-gray-300 rounded-md"}
                />
                <textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    className="w-full h-32 p-2 mt-2 border border-gray-300 rounded-md"
                />
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="px-4 py-2 text-white bg-gray-500 rounded-md">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 text-white bg-blue-500 rounded-md ml-2">Save</button>
                </div>
            </div>
        </div>,
        document.body
    );
}