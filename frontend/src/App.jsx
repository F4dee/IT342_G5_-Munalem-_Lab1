import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { getCurrentUser, setAuthToken, clearAuthToken, getToken } from './services/api.js';

function ProtectedRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
}

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">Jonas gwapo</span>
        {user && <span className="welcome">Welcome, {user.firstName}</span>}
      </div>
      <div className="nav-right">
        {!user && (
          <>
            <Link to="/login" className="btn-link">
              Login
            </Link>
            <Link to="/register" className="btn-link">
              Register
            </Link>
          </>
        )}
        {user && (
          <button className="btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    setAuthToken(token);
    getCurrentUser()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        clearAuthToken();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAuthSuccess = (token) => {
    setAuthToken(token);
    getCurrentUser()
      .then((data) => {
        setUser(data);
        navigate('/dashboard');
      })
      .catch(() => {
        clearAuthToken();
      });
  };

  const handleLogout = () => {
    clearAuthToken();
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return <div className="centered">Loading...</div>;
  }

  return (
    <div className="app-container">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<Register onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

