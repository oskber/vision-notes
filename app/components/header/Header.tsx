import AddButton from '@/app/components/header/AddButton';
import { auth, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';

function SignOut() {
    return (
        <form action={async () => {
            'use server';
            await signOut()
        }}>
            <button type="submit">Sign out</button>
        </form>
    )
}


const Header = async () => {
    const session = await auth();
    console.log("session header: ", session);
    return (
        <header className="flex flex-col items-center justify-center border-b">
            <nav className="flex items-center justify-between w-full px-6">
                {session?.user ? (
                    <div className="flex-column">
                        {session.user.name && <span>{session.user.name}</span>}
                        {session.user.image &&
                            <Image src={session.user.image} alt={session.user.name ?? "User"} width={32} height={32}
                                   className="rounded-full"/>}
                        <SignOut/>
                    </div>
                ) : (
                    <Link href="/login">
                        <button className="">Sign in</button>
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