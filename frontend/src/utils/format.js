import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const formatCurrency = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);

export const formatDate = (d, fmt = 'MMM DD, YYYY') => d ? dayjs(d).format(fmt) : '—';

export const formatRelative = (d) => d ? dayjs(d).fromNow() : '—';

export const formatPct = (n) => n != null ? `${n}%` : '—';

export const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';

export const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
};

export const getStatusClass = (status) => ({
  Active:     'badge-success',
  Excelling:  'badge-purple',
  'On Track': 'badge-success',
  'At Risk':  'badge-warning',
  'High Risk':'badge-danger',
  Inactive:   'badge-gray',
  Graduated:  'badge-info',
  Paid:       'badge-success',
  Pending:    'badge-warning',
  Overdue:    'badge-danger',
  Waived:     'badge-gray',
  Completed:  'badge-success',
  Scheduled:  'badge-info',
  Live:       'badge-danger',
  Cancelled:  'badge-gray',
  'Due Soon': 'badge-warning',
  Upcoming:   'badge-primary',
}[status] || 'badge-gray');

export const BATCH_COLORS = {
  'JEE Batch A': '#4f46e5',
  'JEE Batch B': '#7c3aed',
  'NEET Batch A': '#059669',
  'NEET Batch B': '#0891b2',
  'Foundation':  '#d97706',
};

export const SUBJECT_COLORS = {
  Physics:   '#4f46e5',
  Chemistry: '#059669',
  Maths:     '#d97706',
  Biology:   '#0891b2',
  'All Subjects': '#7c3aed',
};
