import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useCurrency } from '../context/CurrencyContext';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const { currency, formatAmount } = useCurrency();

  useEffect(() => {
    api.get(`/reports/dashboard?currency=${currency}`).then((res) => setData(res.data));
  }, [currency]);

  if (!data) return <div className="loading">Loading dashboard...</div>;

  const cards = [
    { label: 'Total Revenue', value: data.totalRevenue, color: 'var(--color-primary)' },
    { label: 'Total Expenses', value: data.totalExpenses, color: '#EF4444' },
    { label: 'Net Profit', value: data.netProfit, color: data.netProfit >= 0 ? 'var(--color-primary)' : '#EF4444' },
    { label: 'Cash Balance', value: data.cashBalance, color: 'var(--color-secondary)' },
  ];

  return (
    <div className="page-padding" style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <h1>Dashboard</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {cards.map((card) => (
          <div key={card.label} className="card">
            <p className="form-label" style={{ color: 'var(--color-text-medium)' }}>{card.label}</p>
            <p style={{
              fontSize: '28px',
              fontWeight: '700',
              color: card.color,
              marginTop: '8px',
              marginBottom: 0
            }}>
              {formatAmount(card.value)}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <Link to="/transactions?type=SALE" className="btn-primary">
          + New Sale
        </Link>
        <Link to="/transactions?type=PURCHASE" className="btn-secondary">
          + New Purchase
        </Link>
        <Link to="/salaries" className="btn-secondary">
          Pay Salary
        </Link>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3 style={{ padding: '16px 16px 0 16px', margin: 0 }}>Recent Transactions</h3>
        </div>
        <table style={{ width: '100%' }}>
          <thead className="table-header">
            <tr>
              <th className="table-header">Date</th>
              <th className="table-header">Description</th>
              <th className="table-header">Type</th>
              <th className="table-header">Amount</th>
              <th className="table-header">By</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {data.recentTransactions.map((t) => (
              <tr key={t.id}>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{t.description}</td>
                <td>
                  <span className="badge badge-primary">{t.type}</span>
                </td>
                <td className="numeric">
                  {t.journalEntries?.[0] && formatAmount(parseFloat(t.journalEntries[0].debitAmount || t.journalEntries[0].creditAmount))}
                </td>
                <td style={{ color: 'var(--color-text-medium)' }}>{t.user?.name}</td>
              </tr>
            ))}
            {data.recentTransactions.length === 0 && (
              <tr><td colSpan={5} className="empty-state">No transactions yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
