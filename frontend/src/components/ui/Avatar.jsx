export function Avatar({ seed, name, size = 32, rounded = false }) {
  const initials = name ? name.split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase() : '?';
  const url = seed
    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
    : null;
  const br = rounded ? '50%' : `${Math.round(size * 0.28)}px`;
  const style = { width: size, height: size, borderRadius: br, flexShrink: 0, overflow: 'hidden', background: 'var(--bg-2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize: size*0.35, fontWeight:700, color:'var(--text-3)' };
  return (
    <div style={style}>
      {url ? <img src={url} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : initials}
    </div>
  );
}
