// import { NextResponse } from 'next/server';
// import { createUser, findUserByEmail } from '@/app/queries/users';
// import connectDB from '@/app/lib/connectDB';
// import bcrypt from 'bcryptjs';
//
// export const POST = async (request: Request) => {
//     console.log('Received registration request');
//     const { name, email, password } = await request.json();
//     console.log('Request data:', { name, email, password });
//
//     try {
//         await connectDB();
//         console.log('Database connected');
//
//         const existingUser = await findUserByEmail(email);
//         if (existingUser) {
//             console.log('User with this email already exists');
//             return new NextResponse('User with this email already exists', {
//                 status: 409,
//             });
//         }
//
//         const hashedPassword = await bcrypt.hash(password, 10);
//         console.log('Password hashed');
//
//         const newUser = {
//             name,
//             email,
//             password: hashedPassword,
//         };
//
//         await createUser(newUser);
//         console.log('User created');
//
//         return new NextResponse('User has been created', {
//             status: 201,
//         });
//     } catch (error) {
//         console.error('Error during registration:', error);
//         return new NextResponse('Error creating user', {
//             status: 500,
//         });
//     }
// };
//
