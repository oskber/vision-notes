import React from 'react';

interface SelectButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

export default function SelectButton({ onClick, disabled, children }: SelectButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`fade-in rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center font-bold text-sm text-white transition-all shadow-md ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none'
            } ml-2`}
            type="button"
        >
            {children}
        </button>
    );
}