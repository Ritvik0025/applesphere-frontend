import React, { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirm || !phone) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
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
            Join thousands of apple farmers managing their orchards smarter with AI
          </p>
          <div className="mt-5 text-start">
            {[
              '🌱  Free to get started',
              '📱  Works on all devices',
              '🤖  AI powered insights',
              '🔒  Your data is secure',
              '🌍  Made for Himalayan farmers',
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '12px', fontSize: '14px', opacity: 0.9 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side — register form */}
      <div className="d-flex flex-column justify-content-center align-items-center p-4"
        style={{ flex: 1 }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          {/* Mobile logo */}
          <div className="text-center mb-4 d-lg-none">
            <span style={{ fontSize: '40px' }}>🍎</span>
            <h2 style={{ color: 'var(--primary-dark)', fontWeight: 800 }}>AppleSphere</h2>
          </div>

          <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Create your account
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '28px' }}>
            Start managing your orchard today
          </p>

          {error && (
            <div className="alert alert-danger py-2 small">{error}</div>
          )}

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label fw-medium small">Full name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ritvik Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ borderColor: 'var(--border)', borderRadius: '8px', padding: '10px 14px' }}
              />
            </div>

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
              <label className="form-label fw-medium small">Phone number</label>
              <input
                type="tel"
                className="form-control"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ borderColor: 'var(--border)', borderRadius: '8px', padding: '10px 14px' }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium small">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderColor: 'var(--border)', borderRadius: '8px', padding: '10px 14px' }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-medium small">Confirm password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Repeat your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                style={{ borderColor: 'var(--border)', borderRadius: '8px', padding: '10px 14px' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fw-medium"
              disabled={loading}
              style={{ borderRadius: '8px', padding: '10px', fontSize: '15px' }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center small text-muted mt-4 mb-0">
            Already have an account?{' '}
            <a href="/login" className="fw-medium text-decoration-none"
              style={{ color: 'var(--primary)' }}>
              Sign in
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;