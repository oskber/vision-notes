'use client';

import React, {useRef, useEffect, useState} from 'react';
import TextModal from '@/app/components/TextModal';
import {SingleNoteProps} from '@/app/components/SingleNote';
import {useNotes} from '@/app/context/NotesContext';

export default function UploadSelect() {
    const photoInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { notes, setNotes } = useNotes();

    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (/android|iPad|iPhone|iPod/.test(userAgent)) {
            setIsMobile(true);
        }
    }, []);

    const handlePhotoClick = () => {
        if (photoInputRef.current) {
            photoInputRef.current.click();
        }
    };

    const handleFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleTextClick = () => {
        setIsModalOpen(true);
    };

    const handleSaveText = (title: string, text: string) => {
        const newNote: SingleNoteProps = { title, content: text };
        setNotes([...notes, newNote]);
    };

    return (
        <div className="flex flex-col gap-4 mr-3">
            {isMobile ? (
                <button
                    onClick={handlePhotoClick}
                    className="fade-in rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center font-bold text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                    type="button">
                    Photo
                </button>
            ) : (
                <button
                    className="fade-in rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center font-bold text-sm text-white transition-all shadow-md opacity-50 cursor-not-allowed ml-2"
                    type="button"
                    disabled>
                    Photo (Mobile Only)
                </button>
            )}
            <input
                type="file"
                ref={photoInputRef}
                style={{display: 'none'}}
                accept="image/*"
                capture="environment"
            />
            <button
                onClick={handleFileClick}
                className="fade-in rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center font-bold text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                type="button">
                File
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                accept="*/*"
            />
            <button
                onClick={handleTextClick}
                className="fade-in rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center font-bold text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                type="button">
                Text
            </button>
            <input
                type="text"
                ref={textInputRef}
                className="hidden"
            />
            {isModalOpen && (
                <TextModal
                    onClose={() => setIsModalOpen(false)}
                    OnSave={handleSaveText}
                />
            )}
        </div>
    );
}