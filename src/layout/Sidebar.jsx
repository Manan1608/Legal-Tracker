import { useNavigate, useLocation } from "react-router-dom";

/* ─── Sidebar Nav Item ─────────────────────────────────────────── */
function NavItem({ onClick, active, children, title }) {
  return (
    <div
      onClick={onClick}
      title={title}
      style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        background: active ? 'rgba(255,255,255,0.22)' : 'transparent',
        boxShadow: active ? '0 0 0 6px rgba(255,255,255,0.10)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'background 0.18s, box-shadow 0.18s',
      }}
      onMouseEnter={e => {
        if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
      }}
      onMouseLeave={e => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }}
    >
      {children}
    </div>
  );
}

/* ─── Icons ────────────────────────────────────────────────────── */
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CasesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

/* ─── Sidebar ──────────────────────────────────────────────────── */
export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard     = location.pathname === '/dashboard' || location.pathname === '/';
  const isCases         = location.pathname.startsWith('/case');
  const isNotifications = location.pathname === '/notifications';

  return (
    <div style={{
      width: 70,
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 62,
    }}>
      <div style={{
        width: 58,
        height: 210,
        borderRadius: 50,
        background: '#1768B3',
        boxShadow: '8px 8px 20px 0px #51729033, 4px 4px 4px 0px #677C8F26',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        padding: '16px 0',
      }}>

        {/* Home */}
        <NavItem onClick={() => navigate('/dashboard')} active={isDashboard} title="Home">
          <HomeIcon />
        </NavItem>

        {/* Cases / Briefcase */}
        <NavItem onClick={() => navigate('/case/100562567')} active={isCases} title="Cases">
          <CasesIcon />
        </NavItem>

        {/* Notifications / Bell */}
        <NavItem onClick={() => navigate('/notifications')} active={isNotifications} title="Notifications">
          <BellIcon />
        </NavItem>

      </div>
    </div>
  );
}