import {signIn, signOut, useSession} from 'next-auth/react'

export default function AuthButtons () {
    const { data: session } = useSession();

    return (
        <div className="flex items-center justify-center">
            {session ? (
                <button onClick={() => signOut()} className="btn btn-primary">Sign Out</button>
            ) : (
                <button onClick={() => signIn()} className="btn btn-primary">Sign In</button>
            )}
        </div>
    );
}