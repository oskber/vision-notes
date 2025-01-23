import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

export default function LoginButton() {
    return (
        <button
            type="submit"
            className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white font-medium text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
        >
            <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
            Login
        </button>
    );
}