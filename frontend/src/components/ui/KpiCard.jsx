import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function Counter({ target, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    const raf = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target]);
  return <>{prefix}{typeof val === 'number' ? val.toLocaleString('en-IN') : val}{suffix}</>;
}

export function KpiCard({ title, value, prefix='', suffix='', icon: Icon, gradient, change, changeUp, sparklineData }) {
  return (
    <motion.div
      className="kpi-card"
      style={{ '--kpi-color': gradient?.split(',')[1]?.trim() || 'var(--primary)' }}
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.4, ease:'easeOut' }}
      whileHover={{ y:-3 }}
    >
      <div className="kpi-top">
        <div className="kpi-icon" style={{ background: gradient }}>
          <Icon size={22} color="white" />
        </div>
        {sparklineData && (
          <div className="kpi-sparkline">
            <svg viewBox="0 0 80 32" width="80" height="32" style={{ display:'block' }}>
              {sparklineData.map((v, i, arr) => {
                if (i === 0) return null;
                const max = Math.max(...arr); const min = Math.min(...arr);
                const x1 = ((i-1)/(arr.length-1))*80, y1 = 32-((arr[i-1]-min)/(max-min||1))*28;
                const x2 = (i/(arr.length-1))*80,    y2 = 32-((v-min)/(max-min||1))*28;
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: gradient?.includes('#') ? gradient.split(',')[1]?.trim() : 'var(--primary)', opacity:0.6 }} />;
              })}
            </svg>
          </div>
        )}
      </div>
      <div className="kpi-value">
        <Counter target={typeof value === 'number' ? value : 0} prefix={prefix} suffix={suffix} />
      </div>
      <div className="kpi-label">{title}</div>
      {change && (
        <div className={`kpi-change ${changeUp ? 'up' : 'down'}`}>
          {changeUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </div>
      )}
    </motion.div>
  );
}
