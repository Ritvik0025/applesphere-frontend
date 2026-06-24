import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  if (!email || !password) {
    setError('Please fill in all fields');
    return;
  }

  setLoading(true);
  try {
    const response = await API.post('/api/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('name', response.data.name);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('role', response.data.role);
    localStorage.setItem('plan', response.data.plan);
    navigate('/dashboard');
  } catch (err: any) {
    setError('Invalid email or password');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-vh-100 d-flex" style={{ background: 'var(--background)' }}>

      {/* Left side — green panel */}
      <div
        className="d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5"
        style={{ width: '45%', background: 'var(--primary-dark)' }}
      >
        <div className="text-center">
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🍎</div>
          <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '12px' }}>
            AppleSphere
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.85, lineHeight: 1.6 }}>
            AI-Powered Apple Orchard Management Platform for Himalayan Farmers
          </p>
          <div className="mt-5 text-start">
            {[
              '🌿  Orchard & tree management',
              '📊  Profit & loss analytics',
              '🤖  AI orchard advisor',
              '🌤️  Climate intelligence',
              '🛒  Buyer marketplace',
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '12px', fontSize: '14px', opacity: 0.9 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side — login form */}
      <div className="d-flex flex-column justify-content-center align-items-center p-4"
        style={{ flex: 1 }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          {/* Mobile logo */}
          <div className="text-center mb-4 d-lg-none">
            <span style={{ fontSize: '40px' }}>🍎</span>
            <h2 style={{ color: 'var(--primary-dark)', fontWeight: 800 }}>AppleSphere</h2>
          </div>

          <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Welcome back
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '28px' }}>
            Sign in to manage your orchard
          </p>

          {error && (
            <div className="alert alert-danger py-2 small">{error}</div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-medium small">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="farmer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderColor: 'var(--border)', borderRadius: '8px', padding: '10px 14px' }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium small">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderColor: 'var(--border)', borderRadius: '8px', padding: '10px 14px' }}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label className="form-check-label small text-muted" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <a href="#" className="small text-decoration-none" style={{ color: 'var(--primary)' }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fw-medium"
              disabled={loading}
              style={{ borderRadius: '8px', padding: '10px', fontSize: '15px' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center small text-muted mt-4 mb-0">
            Don't have an account?{' '}
            <a href="/register" className="fw-medium text-decoration-none"
              style={{ color: 'var(--primary)' }}>
              Create account
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;