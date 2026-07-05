import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

// TypeScript interface — defines shape of Orchard data
interface Orchard {
  id: number;
  name: string;
  totalTrees: number;
  areInKanal: number;
  village: string;
  district: string;
  establishedYear: number;
  elevation: number;
}

function Dashboard() {
  const navigate = useNavigate();

  // TypeScript — typed state variables
  const [orchards, setOrchards] = useState<Orchard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Get farmer info from localStorage
  const farmerName = localStorage.getItem('name') || 'Farmer';
  const plan = localStorage.getItem('plan') || 'FREE';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchOrchards();
  }, []);

  const fetchOrchards = async (): Promise<void> => {
    try {
      const response = await API.get('/api/orchards');
      setOrchards(response.data);
    } catch (err) {
      console.error('Failed to fetch orchards');
    } finally {
      setLoading(false);
    }
  };

  // Calculate total trees across all orchards
  const totalTrees: number = orchards.reduce(
    (sum: number, o: Orchard) => sum + o.totalTrees, 0
  );

  // Calculate total area
  const totalArea: number = orchards.reduce(
    (sum: number, o: Orchard) => sum + o.areInKanal, 0
  );

  if (loading) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '60vh' }}>
          <div className="spinner-border" style={{ color: 'var(--primary)' }} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <p className="page-title">Welcome back, {farmerName} 🍎</p>
          <p className="page-subtitle">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long', year: 'numeric',
              month: 'long', day: 'numeric'
            })}
          </p>
        </div>
        {plan === 'PRO' && (
          <span className="badge"
            style={{ background: 'var(--accent)', color: 'white', padding: '6px 12px' }}>
            PRO Plan
          </span>
        )}
      </div>

      {/* Stat cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#E8F5E9' }}>🌳</div>
            <div className="stat-value">{totalTrees}</div>
            <div className="stat-label">Total Trees</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#FFF3E0' }}>🏡</div>
            <div className="stat-value">{orchards.length}</div>
            <div className="stat-label">Orchards</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#E3F2FD' }}>📐</div>
            <div className="stat-value">{totalArea.toFixed(1)}</div>
            <div className="stat-label">Total Kanal</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#FCE4EC' }}>📈</div>
            <div className="stat-value">₹0</div>
            <div className="stat-label">Net Profit</div>
          </div>
        </div>
      </div>

      {/* Orchards section */}
      <div className="row g-3">
        <div className="col-md-8">
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">🌳 My Orchards</h6>
              <a href="/orchard"
                style={{ color: 'var(--primary)', fontSize: '13px', textDecoration: 'none' }}>
                Manage →
              </a>
            </div>
            {orchards.length === 0 ? (
              <div className="text-center py-4">
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌱</div>
                <p className="text-muted small">No orchard added yet</p>
                <a href="/orchard"
                  className="btn btn-sm btn-primary mt-2">
                  Add Your First Orchard
                </a>
              </div>
            ) : (
              orchards.map((orchard: Orchard) => (
                <div key={orchard.id}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    marginBottom: '10px'
                  }}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="fw-medium">{orchard.name}</div>
                      <div className="text-muted small">
                        {orchard.village}, {orchard.district}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-medium">{orchard.totalTrees} trees</div>
                      <div className="text-muted small">{orchard.areInKanal} Kanal</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 mb-3">
            <h6 className="fw-bold mb-3">🌤️ Today's Weather</h6>
            <p className="text-muted small">Climate module coming in Week 2</p>
          </div>
          <div className="card p-4">
            <h6 className="fw-bold mb-3">💧 Next Spray</h6>
            <p className="text-muted small">Spray schedule coming in Week 2</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;