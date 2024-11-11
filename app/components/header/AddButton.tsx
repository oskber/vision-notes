'use client';

import React from 'react';
import UploadSelect from './UploadSelect';

export default function AddButton() {
    const [showUploadSelect, setShowUploadSelect] = React.useState(false);

    const handleClick = () => {
        setShowUploadSelect(prevState => !prevState);
    };

    return (
        <div className="relative">
            <button onClick={handleClick}
                    className="flex items-center justify-center w-12 h-12 bg-gray-500 text-white rounded-full shadow focus:outline-none hover:bg-gray-400">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </button>
            {showUploadSelect && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2">
                    <UploadSelect />
                </div>
            )}
        </div>
    );
}