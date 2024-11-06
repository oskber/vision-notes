export interface SingleNoteProps {
    title?: string
    content?: string
}

export default function SingleNote({title, content}: SingleNoteProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-500">{content}</p>
        </div>
    );
}