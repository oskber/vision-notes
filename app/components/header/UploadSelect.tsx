'use client';

import React, {useRef, useEffect, useState} from 'react';
import NoteModal from '@/app/components/NoteModal';
import {SingleNoteProps} from '@/app/components/SingleNote';
import {useNotes} from '@/app/context/NotesContext';
import SelectButton from '@/app/components/header/SelectButton';
import { v4 as uuidV4 } from 'uuid';

export default function UploadSelect() {
    const photoInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [extractedText, setExtractedText] = useState('');
    const {notes, setNotes} = useNotes();

    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (/android|iPad|iPhone|iPod/.test(userAgent)) {
            setIsMobile(true);
        }
    }, []);

    const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('photo', file);

            try {
                const response = await fetch('/api/upload-photo', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    const data = await response.json();
                    setExtractedText(data.extractedText);
                    setIsModalOpen(true);
                } else {
                    console.error('Failed to upload photo');
                }
            } catch (error) {
                console.error('Error uploading photo:', error);
            }
        }
    };

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
        const newNote: SingleNoteProps = {id: uuidV4(), title, content: text};
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
                onChange={handlePhotoUpload}
            />
            <SelectButton onClick={handleFileClick}>
                File
            </SelectButton>
            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                accept="image/*"
                onChange={handlePhotoUpload}
            />
            <SelectButton onClick={handleTextClick}>Text</SelectButton>
            <input
                type="text"
                ref={textInputRef}
                className="hidden"
            />
            {isModalOpen && (
                <NoteModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveText}
                    initialText={extractedText}
                />
            )}
        </div>
    );
}