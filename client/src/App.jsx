import React from 'react';
import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={
              <GoogleOAuthProvider clientId="">
              <SignIn />
            </GoogleOAuthProvider>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
