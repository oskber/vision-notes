'use server';

import {signIn} from '@/auth'
import {fetchNotes} from '@/app/actions/noteAction';
import {getSession} from 'next-auth/react';

export async function doSocialLogin(formData: FormData) {
    const action = formData.get('action') as string | undefined;
    await signIn(action, { redirectTo: '/' });
}

export async function doCredentialLogin(formData: FormData) {
    try {
        const loginResult = await signIn('credentials', {
            redirect: false, // Prevent automatic page redirects
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        });

        if (loginResult?.ok) {
            // Refresh session to update session state
            const updatedSession = await getSession();
            console.log('Updated Session:', updatedSession);

            // Fetch the notes data after session is refreshed
            await fetchNotes();

            return { success: true };
        } else {
            console.error('Failed to log in:', loginResult?.error);
            return { success: false, error: loginResult?.error };
        }
    } catch (error) {
        console.error('Login failed:', error);
        return { success: false, error };
    }
}