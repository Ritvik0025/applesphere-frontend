import React from 'react';
import Layout from '../../components/Layout';

function Dashboard() {
  return (
    <Layout>
      <div>
        <p className="page-title">Dashboard</p>
        <p className="page-subtitle">Welcome to your orchard overview</p>

        {/* Stat cards row */}
        <div className="row g-3 mb-4">

          <div className="col-md-3">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#E8F5E9' }}>
                🌳
              </div>
              <div className="stat-value">240</div>
              <div className="stat-label">Total Trees</div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#FFF3E0' }}>
                📦
              </div>
              <div className="stat-value">1,200</div>
              <div className="stat-label">Boxes This Year</div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#E3F2FD' }}>
                💰
              </div>
              <div className="stat-value">₹4.2L</div>
              <div className="stat-label">Net Profit</div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#FCE4EC' }}>
                📈
              </div>
              <div className="stat-value">₹1,800</div>
              <div className="stat-label">Avg Rate/Box</div>
            </div>
          </div>

        </div>

        {/* Coming soon cards */}
        <div className="row g-3">
          <div className="col-md-6">
            <div className="card p-4">
              <h6 className="fw-bold mb-3">🌤️ Today's Weather</h6>
              <p className="text-muted small">Climate data coming soon</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-4">
              <h6 className="fw-bold mb-3">💧 Next Spray</h6>
              <p className="text-muted small">Spray schedule coming soon</p>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;