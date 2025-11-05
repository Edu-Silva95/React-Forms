import { useEffect, useState } from 'react';
import { getCurrentUser, clearCurrentUser } from '../util/auth.js';

export default function Home({ onNavigate }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
  }, []);

  function handleLogout() {
    clearCurrentUser();
    onNavigate && onNavigate('login');
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-blue-500 mb-20 flex justify-center">
        Welcome to the Home Page{user ? `, ${user.firstName} ${user.lastName}` : ''}
      </h1>

    <div className="text-center">
      <p className="text-2xl font-bold text-red-400 mb-3">This page could be used to create new content or features. However, this was a project about user Input and Form handling, so nothing will be displayed here.</p>
      <p className="text-2xl font-bold text-red-400 mb-3">If you are here, I would like to thank you for your interest in this project!</p>
      <p className="text-2xl font-bold text-red-400 mb-3">Have a Great Day!</p>
    </div>

    <div className='flex justify-center'>
      <p>
        <button className="px-4 py-2 text-base rounded border-none bg-[#147b73] text-[#d9e2f1] cursor-pointer mt-20" onClick={handleLogout}>Logout</button>
      </p>
    </div>
    </section>
  );
}
