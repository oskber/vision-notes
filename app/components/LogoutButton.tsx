import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';

export default function LogoutButton() {
    return (
        <button
            type="submit"
            className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white font-medium text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition"
        >
            <ArrowLeftEndOnRectangleIcon className="h-4 w-4" />
            Logout
        </button>
    );
}