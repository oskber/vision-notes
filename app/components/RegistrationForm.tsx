// 'use client';
//
// import React from 'react';
// import SocialLogin from '@/app/components/SocialLogin';
// import {useRouter} from 'next/navigation';
//
//
// const RegistrationForm = () => {
//
//     const router = useRouter();
//
//     async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//         event.preventDefault();
//
//         try {
//             const formData = new FormData(event.currentTarget);
//
//             const name = formData.get('name') as string;
//             const email = formData.get('email') as string;
//             const password = formData.get('password') as string;
//
//             const response = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({name, email, password}),
//             });
//
//             response.status === 201 && router.push('/')
//
//         } catch (error) {
//             console.error('Registration failed:', error);
//         }
//     }
//
//     return (
//         <>
//             <form onSubmit={handleSubmit} className="flex flex-col items-center p-3">
//                 <div className="my-2">
//                     <label htmlFor="email">Name: </label>
//                     <input className="rounded-md text-black" type="name" name="name" id="name"/>
//                 </div>
//                 <div className="my-2">
//                     <label htmlFor="email">Email: </label>
//                     <input className="rounded-md text-black" type="email" name="email" id="email"/>
//                 </div>
//                 <div className="my-2">
//                     <label htmlFor="password">Password: </label>
//                     <input className="rounded-md text-black" type="password" name="password" id="password"/>
//                 </div>
//                 <button className="bg-white text-black p-1 rounded-md m-1 text-lg" type="submit">Register</button>
//
//             </form>
//             <SocialLogin/>
//         </>
//     );
// }
//
// export default RegistrationForm;