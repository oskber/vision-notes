import User from '../models/userModel';


export async function createUser(user: { name: string, email: string, password: string }) {
    try {
        await User.create(user);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const findUserByEmail = async (email: string) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        throw new Error((error as Error).message);
    }
};