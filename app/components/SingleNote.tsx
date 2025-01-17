import React, { useState } from 'react';
import NoteModal from '@/app/components/NoteModal';
import { SingleNoteComponentProps } from "@/app/types/note";

const SingleNote: React.FC<SingleNoteComponentProps> = ({ id, title, content, onDelete, createdAt }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTitle] = useState(title);
    const [currentContent] = useState(content);
    const [currentId] = useState(id);

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-34 flex flex-col justify-between bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg mb-6 py-5 px-4" id={`note-${id}`}>
            <div>
                <h3 className="text-gray-800 dark:text-gray-100 font-bold mb-3 truncate">{title}</h3>
                <p className="text-gray-800 dark:text-gray-100 text-sm line-clamp-3">{content}</p>
            </div>
            <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
                <p className="text-sm">{formatDate(createdAt)}</p>
                <div className="flex gap-2">
                    <button
                        onClick={handleEditClick}
                        className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        aria-label="edit note"
                        role="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(id)}
                        className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                        aria-label="delete note"
                        role="button"
                    >
                        <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                    </button>
                </div>
            </div>

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