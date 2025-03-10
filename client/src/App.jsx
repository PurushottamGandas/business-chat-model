import React from 'react';
import './App.css';
import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashBoard/dashBoard';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
  return (
    <div className="App">
      <h1>WhatsApp Business Authentication</h1>
      <Router>
        <Routes>
        <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={
              <GoogleOAuthProvider clientId="4361366919-q4skr3uvq99pmoso89njb736b11m8kg9.apps.googleusercontent.com">
              <SignIn />
            </GoogleOAuthProvider>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
