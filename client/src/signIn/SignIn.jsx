import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [googleSignIn, setGoogleSignIn] = useState(false);  // State to track Google Sign-In
  const navigate = useNavigate(); // Navigate to dashboard after sign-in

  // Function to handle the Google Sign-In response
  const handleGoogleSignIn = async (response) => {
    if (response?.credential) {
      const token = response.credential;

      try {
        // Send the Google token to your backend for verification
        const backendResponse = await fetch('http://localhost:3000/google-signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }), // Sending Google token to backend
        });

        const result = await backendResponse.json();
        if (backendResponse.ok) {
          alert('Google Sign-in successful!');
          navigate('/dashboard');
        } else {
          setErrorMessage(result.error || 'Error signing in with Google');
        }
      } catch (error) {
        console.error('Error during Google Sign-in:', error);
        setErrorMessage('Error signing in with Google');
      }
    } else {
      setErrorMessage('Google Sign-In failed.');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Sign-in successful!');
        navigate('/dashboard');
        console.log(result);
      } else {
        setErrorMessage(result.error || 'Error signing in');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorMessage('Error signing in');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>

      {/* Conditionally render Google Sign-In button */}
      {!googleSignIn ? (
        <div>
          <button onClick={() => setGoogleSignIn(true)}>Sign In with Google</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleGoogleSignIn}  // Success callback
          onError={() => setErrorMessage('Google Sign-In failed')}  // Error callback
        />
      )}

      <h3>OR</h3>

      {/* Email and Password Form */}
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign In</button>
      </form>

      {/* Display error message */}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default SignIn;
