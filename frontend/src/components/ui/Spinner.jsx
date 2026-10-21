export function Spinner({ size = 'md', center = false }) {
  const cls = size === 'lg' ? 'spinner spinner-lg' : 'spinner';
  if (center) {
    return (
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:60 }}>
        <div className={cls} />
      </div>
    );
  }
  return <div className={cls} />;
}
