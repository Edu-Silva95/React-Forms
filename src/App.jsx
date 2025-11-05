import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home.jsx';
import { getCurrentUser } from './util/auth.js';

function App() {
  const [page, setPage] = useState('login'); // 'login' | 'signup' | 'home'

  // Keep the user logged in across page reloads by checking localStorage on mount.
  useEffect(() => {
    const current = getCurrentUser();
    if (current) setPage('home');
  }, []);

  return (
    <>
      <Header />
      <main>
        {page === 'login' ? (
          <Login onNavigate={(p) => setPage(p)} />
        ) : page === 'signup' ? (
          <Signup onNavigate={(p) => setPage(p)} />
        ) : (
          <Home onNavigate={(p) => setPage(p)} />
        )}
      </main>
    </>
  );
}

export default App;
