import React, {useState} from 'react';
import NoteModal from '@/app/components/NoteModal';
import { SingleNoteComponentProps } from "@/app/types/note";


const SingleNote: React.FC<SingleNoteComponentProps> = ({ id, title, content, onDelete }) => {
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
                    className="absolute bottom-2 right-10 mt-4 mr-2 px-1 py-0.5 text-white bg-blue-500 rounded-md hover:bg-blue-400">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                </svg>

            </button>
            <button
                onClick={() => onDelete(id)}
                className="absolute bottom-2 right-2 mt-4 px-1 py-0.5 text-white bg-red-500 rounded-md hover:bg-red-400"
            >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
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