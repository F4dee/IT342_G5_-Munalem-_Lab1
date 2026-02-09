import React from 'react';

export default function Dashboard({ user }) {
  if (!user) {
    // Fallback if user data not yet loaded; will be fetched in App on auth
    return (
      <div className="card">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Dashboard / Profile</h2>
      <div className="profile-grid">
        <div>
          <span className="label">First Name</span>
          <span>{user.firstName}</span>
        </div>
        <div>
          <span className="label">Last Name</span>
          <span>{user.lastName}</span>
        </div>
        <div>
          <span className="label">Username</span>
          <span>{user.username}</span>
        </div>
        <div>
          <span className="label">Email</span>
          <span>{user.email}</span>
        </div>
        {user.createdAt && (
          <div>
            <span className="label">Member Since</span>
            <span>{new Date(user.createdAt).toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

