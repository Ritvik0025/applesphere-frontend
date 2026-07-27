import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import API from '../../services/api';

// TypeScript interface
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

function OrchardPage() {
  const [orchards, setOrchards] = useState<Orchard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Form fields — TypeScript string types
  const [name, setName] = useState<string>('');
  const [areInKanal, setAreInKanal] = useState<string>('');
  const [totalTrees, setTotalTrees] = useState<string>('');
  const [village, setVillage] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [establishedYear, setEstablishedYear] = useState<string>('');
  const [elevation, setElevation] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
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

  const handleCreate = async (): Promise<void> => {
    setError('');
    if (!name || !areInKanal || !totalTrees || !village || !district) {
      setError('Please fill all required fields');
      return;
    }
    try {
      const response = await API.post('/api/orchards', {
        name,
        areInKanal: parseFloat(areInKanal),
        totalTrees: parseInt(totalTrees),
        village,
        district,
        establishedYear: parseInt(establishedYear) || 2000,
        elevation: parseFloat(elevation) || 0,
      });
      setOrchards([...orchards, response.data]);
      setShowModal(false);
      setName(''); setAreInKanal(''); setTotalTrees('');
      setVillage(''); setDistrict('');
      setEstablishedYear(''); setElevation('');
    } catch (err) {
      setError('Failed to create orchard');
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await API.delete('/api/orchards/' + id);
      setOrchards(orchards.filter((o: Orchard) => o.id !== id));
    } catch (err) {
      console.error('Failed to delete');
    }
  };

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
          <p className="page-title">🌳 My Orchards</p>
          <p className="page-subtitle">Manage all your apple orchards</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          style={{ borderRadius: '8px' }}
        >
          + Add Orchard
        </button>
      </div>

      {/* Orchard list */}
      {orchards.length === 0 ? (
        <div className="card p-5 text-center">
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🌱</div>
          <h5 className="fw-bold">No orchards yet</h5>
          <p className="text-muted">Add your first orchard to start tracking</p>
          <button
            className="btn btn-primary mx-auto mt-2"
            style={{ width: 'fit-content' }}
            onClick={() => setShowModal(true)}
          >
            + Add First Orchard
          </button>
        </div>
      ) : (
        <div className="row g-3">
          {orchards.map((orchard: Orchard) => (
            <div className="col-md-6" key={orchard.id}>
              <div className="card p-4">

                {/* Orchard header */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="fw-bold mb-1">🍎 {orchard.name}</h6>
                    <span className="badge"
                      style={{ background: 'var(--primary)', color: 'white', fontSize: '11px' }}>
                      Est. {orchard.establishedYear}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(orchard.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--danger)',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >
                    🗑️
                  </button>
                </div>

                {/* Orchard details */}
                <div className="row g-2">
                  <div className="col-6">
                    <div style={{
                      background: '#E8F5E9',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center'
                    }}>
                      <div className="fw-bold" style={{ color: 'var(--primary)' }}>
                        {orchard.totalTrees}
                      </div>
                      <div className="small text-muted">Total Trees</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div style={{
                      background: '#FFF3E0',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center'
                    }}>
                      <div className="fw-bold" style={{ color: 'var(--accent)' }}>
                        {orchard.areInKanal}
                      </div>
                      <div className="small text-muted">Kanal</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div style={{
                      background: '#E3F2FD',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center'
                    }}>
                      <div className="fw-bold" style={{ color: '#1565C0' }}>
                        {orchard.elevation}m
                      </div>
                      <div className="small text-muted">Elevation</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div style={{
                      background: '#F3E5F5',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center'
                    }}>
                      <div className="fw-bold" style={{ color: '#6A1B9A' }}>
                        📍
                      </div>
                      <div className="small text-muted">{orchard.village}, {orchard.district}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Orchard Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">🌳 Add New Orchard</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger py-2 small">{error}</div>}
                {[
                  { label: 'Orchard name *', value: name, set: setName, placeholder: 'e.g. Rampur Apple Farm' },
                  { label: 'Area in Kanal *', value: areInKanal, set: setAreInKanal, placeholder: 'e.g. 20.5' },
                  { label: 'Total trees *', value: totalTrees, set: setTotalTrees, placeholder: 'e.g. 240' },
                  { label: 'Village *', value: village, set: setVillage, placeholder: 'e.g. Rampur' },
                  { label: 'District *', value: district, set: setDistrict, placeholder: 'e.g. Shimla' },
                  { label: 'Established year', value: establishedYear, set: setEstablishedYear, placeholder: 'e.g. 2005' },
                  { label: 'Elevation (meters)', value: elevation, set: setElevation, placeholder: 'e.g. 2200' },
                ].map((field) => (
                  <div className="mb-3" key={field.label}>
                    <label className="form-label fw-medium small">{field.label}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      style={{ borderRadius: '8px', borderColor: 'var(--border)' }}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreate}>
                  Save Orchards
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </Layout> // thisis my layout button
  );
}

export default OrchardPage;