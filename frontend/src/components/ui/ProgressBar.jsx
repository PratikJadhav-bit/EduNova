export function ProgressBar({ value, max = 100, color, showLabel = true }) {
  const pct = Math.round((value / max) * 100);
  const barColor = color || (pct >= 80 ? 'var(--success)' : pct >= 60 ? 'var(--warning)' : 'var(--danger)');
  return (
    <div className="progress-row">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%`, background: barColor }} />
      </div>
      {showLabel && <span className="progress-pct">{pct}%</span>}
    </div>
  );
}
