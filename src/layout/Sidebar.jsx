export default function Sidebar() {
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
        height: 254,
        borderRadius: 50,
        background: '#1768B3',
        boxShadow: '8px 8px 20px 0px #51729033, 4px 4px 4px 0px #677C8F26',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
      }}>

        {/* Home */}
        <div style={{
          width: 40, height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>

        {/* Bag — Active (highlighted circle) */}
        <div style={{
          width: 42, height: 42,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 0 0 6px rgba(255,255,255,0.08)',
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
            fill="white" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="1.5" />
            <path d="M16 10a4 4 0 0 1-8 0" fill="none" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Bell */}
        <div style={{
          width: 40, height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>

      </div>
    </div>
  );
}