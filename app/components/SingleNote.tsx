import React, {useState} from 'react';
import NoteModal from '@/app/components/NoteModal';

export interface SingleNoteProps {
    id: string;
    title: string;
    content: string;
    onDelete: (id: string) => void;
}

const SingleNote: React.FC<SingleNoteProps> = ({ id, title, content, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTitle] = useState(title);
    const [currentContent] = useState(content);
    const [currentId] = useState(id);

const handleEditClick = () => {
        setIsModalOpen(true);
}


    return (
        <div className="relative p-2 border rounded-md shadow-md h-24 w-24 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56"
             id={`note-${id}`}>
            <div className="flex-grow flex flex-col justify-start items-start">
                <h3 className="uppercase text-lg font-semibold text-center truncate w-full">{title}</h3>
                <p className="line-clamp-1 sm:line-clamp-3 md:line-clamp-4 lg:line-clamp-5 w-full">{content}</p>
            </div>
            <button onClick={handleEditClick}
                    className="absolute bottom-2 right-10 mt-4 px-2 py-0.5 text-white bg-blue-500 rounded-md hover:bg-blue-400">
                edit
            </button>
            <button
                onClick={() => onDelete(id)}
                className="absolute bottom-2 right-2 mt-4 px-2 py-0.5 text-white bg-red-500 rounded-md hover:bg-red-400"
            >
                X
            </button>
            {isModalOpen && (
                <NoteModal
                    onClose={() => setIsModalOpen(false)}
                    initialText={currentContent}
                    initialTitle={currentTitle}
                    initialNoteId={currentId}
                />
            )}
        </div>
    );
};

export default SingleNote;