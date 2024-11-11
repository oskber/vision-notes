import React from 'react';

export interface SingleNoteProps {
    title: string;
    content: string;
}

const SingleNote: React.FC<SingleNoteProps> = ({ title, content }) => {
    return (
        <div className="p-4 border rounded-md shadow-md">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2">{content}</p>
        </div>
    );
};

export default SingleNote;