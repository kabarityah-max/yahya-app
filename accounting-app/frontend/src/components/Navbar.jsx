import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { currency, toggleCurrency } = useCurrency();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/transactions', label: 'Transactions' },
  ];

  const adminLinks = [
    { path: '/salaries', label: 'Salaries' },
    { path: '/employees', label: 'Employees' },
    { path: '/accounts', label: 'Accounts' },
    { path: '/periods', label: 'Periods' },
    { path: '/reports', label: 'Reports' },
  ];

  const allLinks = [...navLinks, ...(isAdmin ? adminLinks : [])];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/" className="navbar-brand">AccountingApp</Link>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn-secondary btn-sm"
              style={{ whiteSpace: 'nowrap' }}
            >
              ☰ Menu
            </button>
            {menuOpen && (
              <div style={{
                position: 'absolute',
                left: 0,
                top: '100%',
                width: '200px',
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-md)',
                zIndex: 50,
                overflow: 'hidden'
              }}>
                {allLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      color: 'var(--color-text-dark)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      borderBottom: '1px solid var(--color-border)',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-surface)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="navbar-right">
          <button
            onClick={toggleCurrency}
            className="btn-secondary btn-sm"
            style={{ fontFamily: 'monospace' }}
          >
            {currency}
          </button>
          <span className="navbar-user">{user.name}</span>
          <span className="navbar-role">{user.role}</span>
          <button onClick={handleLogout} className="navbar-link">Logout</button>
        </div>
      </div>
    </nav>
  );
}
