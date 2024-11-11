import AddButton from '@/app/components/header/AddButton';

export default function Header () {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-between w-full px-6">
                <h1 className="text-3xl text-center mt-8 mb-5 flex-grow">
                    <strong>vision</strong> notes
                </h1>
                <AddButton/>
            </div>
        </div>
    );
}