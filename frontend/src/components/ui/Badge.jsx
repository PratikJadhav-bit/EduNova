import { getStatusClass } from '../../utils/format';

export function Badge({ status, children, className = '' }) {
  const cls = status ? getStatusClass(status) : '';
  return (
    <span className={`badge ${cls} ${className}`}>
      {children || status}
    </span>
  );
}

export function LiveBadge() {
  return (
    <span className="badge badge-danger" style={{ animation: 'pulse-dot 1.5s infinite', display:'inline-flex', gap:5 }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:'currentColor', display:'inline-block' }} />
      LIVE
    </span>
  );
}
