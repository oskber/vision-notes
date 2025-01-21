'use server';

import {signIn} from '@/auth'

export async function doSocialLogin(formData: FormData) {
    const action = formData.get('action') as string | undefined;
    await signIn(action, { redirectTo: '/' });
}
