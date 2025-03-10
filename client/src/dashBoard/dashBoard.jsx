import React from 'react';

const Dashboard = () => {
  const handleLogout = () => {
    // Clear token from localStorage (or sessionStorage)
    localStorage.removeItem('authToken');
    window.location.href = '/signin'; // Redirect to sign-in page after logout
  };

  return (
    <div style={styles.container}>
      <h2>Welcome to the Dashboard</h2>
      <h3>You're signed in successfully!</h3>
      <p>This is your personal dashboard where you can view your activity and manage settings.</p>
      <p>More features coming soon...</p>

      <button
        style={styles.logoutButton}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Dashboard;
