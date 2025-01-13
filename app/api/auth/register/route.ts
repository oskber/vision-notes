import bcrypt from 'bcryptjs';
import { NextResponse} from 'next/server';
import mongoose from 'mongoose';
import User from '@/app/models/userModel';

const mongoUri = process.env.MONGODB_URI;
async function connectDb() {
    if (!mongoUri) {
        throw new Error('MONGODB_URI must be defined');
    }
    await mongoose.connect(mongoUri);
}

async function RegisterHandler(request: Request) {
    if (request.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' });
    }

    const { username, password } = await request.json();

    if (!username || !password) {
        return NextResponse.json({ error: 'Username and password are required' });
    }

    try {
        await connectDb();

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        const result = await newUser.save();

        if (result) {
            return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}

export const POST = RegisterHandler;