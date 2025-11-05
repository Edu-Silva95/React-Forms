import { useRef } from 'react';
import { useState } from 'react';
import { loginUser, setCurrentUserEmail } from '../util/auth.js';

export default function Login({ onNavigate }) {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [authError, setAuthError] = useState(null);

  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    const emailIsValid = enteredEmail.includes('@');

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);

    const result = loginUser(enteredEmail, enteredPassword);
    if (!result.success) {
      setAuthError(result.error);
      return;
    }

    setAuthError(null);
    setCurrentUserEmail(result.user.email);
    onNavigate && onNavigate('home');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            ref={email}
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={password}
          />
        </div>
      </div>

      {authError && (
        <div className="control-error">
          <p>{authError}</p>
        </div>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">Reset</button>
        <button className="button">Login</button>
        <button type="button" className="button" onClick={() => onNavigate && onNavigate('signup')}>
          Sign Up
        </button>
      </p>
    </form>
  );
}
