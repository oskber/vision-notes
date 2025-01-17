import SocialLogin from '@/app/components/SocialLogin'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginForm = () => {

    const [error, setError] = useState('');
    const router = useRouter();

    // async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    //     event.preventDefault();
    //
    //     try {
    //         const formData = new FormData(event.currentTarget);
    //
    //         const response = await doCredentialLogin(formData);
    //
    //         if (response.error) {
    //             setError(response.error.message);
    //         } else {
    //             router.push('/');
    //         }
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //         setError("Check your credentials")
    //     }
    // }
    return (
        <>
            {/*<form className="flex flex-col items-center p-3" onSubmit={handleFormSubmit}>*/}
            {/*    <div className="my-2">*/}
            {/*        <label htmlFor="email">Email: </label>*/}
            {/*        <input className="rounded-md text-black" type="email" name="email" id="email"/>*/}
            {/*    </div>*/}
            {/*    <div className="my-2">*/}
            {/*        <label htmlFor="password">Password: </label>*/}
            {/*        <input className="rounded-md text-black" type="password" name="password" id="password"/>*/}
            {/*    </div>*/}
            {/*        <button className="bg-white text-black p-1 rounded-md m-1 text-lg" type="submit">Credential login</button>*/}

            {/*</form>*/}
            <SocialLogin/>
            <p className="text-red">{error}</p>
        </>
);
}

export default LoginForm;