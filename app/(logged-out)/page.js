"use client";
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromEmail } from '@/utils/auth/serverUtils';
import { signIn } from 'next-auth/react';

export default function LoggedOutPage() {

  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
    
    try {
      const user = await getUserFromEmail(email);
      if (user && user.password === password) {
        const result = await signIn('credentials', {
          email: email,
          password: password,
          redirect: false,
        });
        if (result.ok) {
          router.push('/tasks/');
        } else {
          alert('Invalid email or password');
        }
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm bg-white border-gray-200 border">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Login</h2>
          <p className="text-gray-600">Login to your account</p>
        </div>
        <div className="p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="john@doe.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                autoComplete="on"
                ref={emailRef}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                autoComplete="off"
                ref={passwordRef}
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-gray-700 text-white hover:bg-gray-800">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}