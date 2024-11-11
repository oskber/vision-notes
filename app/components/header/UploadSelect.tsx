'use client';

import React, {useRef, useEffect, useState} from 'react';
import TextModal from '@/app/components/TextModal';
import {SingleNoteProps} from '@/app/components/SingleNote';
import {useNotes} from '@/app/context/NotesContext';
import SelectButton from '@/app/components/header/SelectButton';

export default function UploadSelect() {
    const photoInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {notes, setNotes} = useNotes();

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
        const newNote: SingleNoteProps = {title, content: text};
        setNotes([...notes, newNote]);
    };

    return (
        <div className="flex flex-col gap-4 mr-3">{isMobile ? (
            <SelectButton onClick={handlePhotoClick}>
                Photo
            </SelectButton>
        ) : (
            <SelectButton onClick={handlePhotoClick} disabled>
                Photo (mobile only)
            </SelectButton>
        )}
            <input
                type="file"
                ref={photoInputRef}
                style={{display: 'none'}}
                accept="image/*"
                capture="environment"
            />
            <SelectButton onClick={handleFileClick}>
                File
            </SelectButton>
            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                accept="*/*"
            />
            <SelectButton onClick={handleTextClick}>Text</SelectButton>
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