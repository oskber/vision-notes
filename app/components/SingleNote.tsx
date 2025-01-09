import React from 'react';

export interface SingleNoteProps {
    id: string;
    title: string;
    content: string;
}

const SingleNote: React.FC<SingleNoteProps> = ({ id, title, content }) => {
    return (
        <div className="p-4 border rounded-md shadow-md" id={`note-${id}`}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2">{content}</p>
        </div>
    );
};

export default SingleNote;