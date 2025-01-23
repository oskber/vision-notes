import AddButton from '@/app/components/header/AddButton';
import { auth, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '@/app/components/header/LogoutButton';
import LoginButton from '@/app/components/header/LoginButton';

function SignOut() {
    return (
        <form action={async () => {
            'use server';
            await signOut()
        }}>
        <LogoutButton/>
        </form>
    )
}


const Header = async () => {
    const session = await auth();
    console.log("session header: ", session);
    return (
        <header className="flex flex-col items-center border-b p-4">
            <nav className="flex items-center justify-between w-full">
                {session?.user ? (
                    <div className="flex-col space-y-2">
                        {session.user.name && <span className="text-gray-200">{session.user.name}</span>}
                        {session.user.image &&
                            <Image src={session.user.image} alt={session.user.name ?? "User"} width={32} height={32}
                                   className="rounded-full"/>}
                        <SignOut/>
                    </div>
                ) : (
                    <Link href="/login">
                        <LoginButton />
                    </Link>
                )
                }
                <h1 className="text-3xl text-center mt-8 mb-5 flex-grow">
                    <strong>vision</strong> notes
                </h1>
                <AddButton/>
            </nav>
        </header>
    );
}

export default Header;