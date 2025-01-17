import {doSocialLogin} from '@/app/actions/SocialLogin';

const SocialLogin = () => {
    return (
        <form action={doSocialLogin}>
            <button className="bg-white text-black p-1 rounded-md m-1 text-lg" type="submit" name="action" value="github">Sign in with GitHub</button>
        </form>
    );
}

export default SocialLogin;