import React from 'react';

export interface SingleNoteProps {
    id: string;
    title: string;
    content: string;
    onDelete: (id: string) => void;
}

const SingleNote: React.FC<SingleNoteProps> = ({ id, title, content, onDelete }) => {
    return (
        <div className="p-4 border rounded-md shadow-md flex flex-col justify-between items-start sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40"
             id={`note-${id}`}>
            <div className="flex-grow flex flex-col justify-start items-start">
                <h3 className="text-lg font-semibold text-center">{title}</h3>
                <p className="mt-2 text-center">{content}</p>
            </div>
            <button
                onClick={() => onDelete(id)}
                className="self-end mt-4 px-2 py-1 text-white bg-red-500 rounded-md"
            >
                X
            </button>
        </div>
    );
};

export default SingleNote;