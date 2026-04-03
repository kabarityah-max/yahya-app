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
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/" className="text-lg sm:text-xl font-bold text-emerald-400 truncate">AccountingApp</Link>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hover:text-emerald-300 px-2 sm:px-3 py-2 text-xs sm:text-sm bg-slate-700 hover:bg-slate-600 rounded whitespace-nowrap"
              >
                ☰ Menu
              </button>
              {menuOpen && (
                <div className="absolute left-0 mt-0 w-40 sm:w-48 bg-slate-700 rounded-b shadow-lg z-10">
                  {allLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 sm:px-4 py-2 hover:bg-slate-600 text-xs sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={toggleCurrency}
              className="bg-slate-700 hover:bg-slate-600 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-mono"
            >
              {currency}
            </button>
            <span className="text-xs sm:text-sm text-slate-300 truncate hidden sm:inline">{user.name}</span>
            <span className="text-xs bg-emerald-600 px-1.5 sm:px-2 py-0.5 rounded">{user.role}</span>
            <button onClick={handleLogout} className="text-xs sm:text-sm hover:text-red-300 whitespace-nowrap">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
