import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate(); // Create history object for navigation

    // Replace with actual backend call to send OTP
    const sendSignupRequest = async (email, password, phoneNumber) => {
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, phoneNumber }), // Include phoneNumber in the body
            });

            if (!response.ok) {
                throw new Error('Failed to send OTP');
            }

            const data = await response.json();
            return { success: true };
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Signup failed. Please try again.');
            return { success: false };
        }
    };

    // Replace with actual backend call to verify OTP
    const verifyOtpRequest = async (email, otp) => {
        try {
            const response = await fetch('http://localhost:3000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            if (!response.ok) {
                throw new Error('Failed to verify OTP');
            }

            const data = await response.json();
            console.log("DATA", data);
            if (data.message === 'OTP verified successfully.') {
                alert('Signup successful!');
                navigate('/signin'); // Redirect to the signin page after successful signup and OTP verification
            } else {
                setErrorMessage('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Verification failed. Please try again.');
        }
    };

    // Handle signup button click
    const handleSignup = async () => {
        if (!email || !password || !phoneNumber) {  // Check if phone number is provided
            setErrorMessage('Please enter email, password, and phone number.');
            return;
        }
        setErrorMessage('');
        try {
            const response = await sendSignupRequest(email, password, phoneNumber);
            if (response.success) {
                setOtpSent(true);
            }
        } catch (error) {
            setErrorMessage('Signup failed. Please try again.');
        }
    };

    // Handle OTP verification button click
    const handleVerifyOtp = async () => {
        console.log("OTP", typeof otp);
        await verifyOtpRequest(email, otp);
    };

    return (
        <div className="container">
            {otpSent ? (
                <div className="otp-container">
                    <h2>Enter OTP</h2>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        maxLength="6"
                    />
                    <button onClick={handleVerifyOtp} disabled={otp.length !== 6}>
                        Verify OTP
                    </button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </div>
            ) : (
                <div className="signup-container">
                    <h2>Signup</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                    <PhoneInput
                        international
                        defaultCountry="IN"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        required
                    />
                    <button onClick={handleSignup}>Signup</button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default SignupPage;
