import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/orchard', label: 'My Orchard', icon: '🌳' },
  { path: '/finance', label: 'Profit & Loss', icon: '💰' },
  { path: '/spray', label: 'Spray Schedule', icon: '💧' },
  { path: '/climate', label: 'Climate', icon: '🌤️' },
  { path: '/marketplace', label: 'Marketplace', icon: '🛒' },
  { path: '/community', label: 'Community', icon: '👨‍🌾' },
  { path: '/market', label: 'Market Rates', icon: '📈' },
  { path: '/ai', label: 'AI Advisor', icon: '🤖' },
];

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // TypeScript — boolean state for sidebar expanded or collapsed
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleLogout = (): void => {
    localStorage.clear();
    navigate('/login');
  };

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const farmerName = localStorage.getItem('name') || 'Farmer';

  // TypeScript — width is a string type
  const sidebarWidth: string = expanded ? '240px' : '64px';

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* SIDEBAR */}
      <div
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        style={{
          width: sidebarWidth,
          minHeight: '100vh',
          background: 'var(--primary-dark)',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 100,
          transition: 'width 0.25s ease',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Brand */}
        <div style={{
          padding: '20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: '24px', minWidth: '32px' }}>🍎</span>
          {expanded && (
            <span style={{ color: 'white', fontWeight: 800, fontSize: '18px' }}>
              AppleSphere
            </span>
          )}
        </div>

        {/* Farmer info */}
        {expanded && (
          <div style={{
            padding: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              marginBottom: '8px',
            }}>
              👨‍🌾
            </div>
            <div style={{ color: 'white', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {farmerName}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>
              Apple Farmer
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav style={{ padding: '12px 0', flex: 1 }}>
          {navItems.map((item: NavItem) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                color: isActive(item.path) ? 'white' : 'rgba(255,255,255,0.7)',
                background: isActive(item.path) ? 'rgba(255,255,255,0.12)' : 'transparent',
                borderLeft: isActive(item.path) ? '3px solid var(--accent)' : '3px solid transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                if (!isActive(item.path)) {
                  target.style.background = 'rgba(255,255,255,0.07)';
                  target.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                if (!isActive(item.path)) {
                  target.style.background = 'transparent';
                  target.style.color = 'rgba(255,255,255,0.7)';
                }
              }}
            >
              <span style={{ fontSize: '20px', minWidth: '32px', textAlign: 'center' }}>
                {item.icon}
              </span>
              {expanded && (
                <span style={{ fontSize: '14px' }}>{item.label}</span>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: expanded ? '10px 12px' : '10px 0',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.75)',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: expanded ? 'flex-start' : 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
            }}
          >
            <span>🚪</span>
            {expanded && <span>Logout</span>}
          </button>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div style={{
        marginLeft: sidebarWidth,
        padding: '30px',
        flex: 1,
        transition: 'margin-left 0.25s ease',
      }}>
        {children}
      </div>

    </div>
  );
}

export default Layout;