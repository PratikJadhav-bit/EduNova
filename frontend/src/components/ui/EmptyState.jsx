import { InboxIcon } from 'lucide-react';

export function EmptyState({ title = 'No data', subtitle = 'Nothing to show here yet.', icon: Icon = InboxIcon, action }) {
  return (
    <div className="empty-state">
      <Icon />
      <h3>{title}</h3>
      <p>{subtitle}</p>
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}
