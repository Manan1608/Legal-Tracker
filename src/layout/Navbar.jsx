import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import LogoIcon from "../assets/icons/legal-tracker.svg";
import ProfileImage from "../assets/icons/profile-image.svg";
import PortalToggle from "../components/PortalToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome          = location.pathname === '/dashboard';
  const isNotifications = location.pathname === '/notifications';

  /* ── My Account Dropdown ── */
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  useEffect(() => {
    function handle(e) { if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false); }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  /* ── Support Popup ── */
  const [supportOpen, setSupportOpen] = useState(false);
  const supportRef = useRef(null);
  useEffect(() => {
    function handle(e) { if (supportRef.current && !supportRef.current.contains(e.target)) setSupportOpen(false); }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const navLinkStyle = (active) => ({
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: active ? 600 : 400,
    color: active ? '#101828' : '#667085',
    cursor: 'pointer',
    paddingBottom: 4,
    borderBottom: active ? '2px solid #1E63E9' : '2px solid transparent',
    transition: 'color 0.15s',
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '28px 48px 20px',
      borderBottom: '1px solid #F0F2F5',
      background: '#FAFAFA',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      {/* Left — Logo */}
      <div
        onClick={() => navigate('/dashboard')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
      >
        <img src={LogoIcon} alt="logo" style={{ width: 38, height: 38 }} />
        <h1 style={{
          fontSize: 28, fontWeight: 700, color: '#101828',
          fontFamily: 'Poppins', margin: 0, letterSpacing: '-0.3px',
        }}>
          Legal Tracker
        </h1>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>

        <PortalToggle />

        {/* Home */}
        <span
          style={navLinkStyle(isHome)}
          onClick={() => navigate('/dashboard')}
          onMouseEnter={e => { if (!isHome) e.currentTarget.style.color = '#101828'; }}
          onMouseLeave={e => { if (!isHome) e.currentTarget.style.color = '#667085'; }}
        >
          Home
        </span>

        {/* Support — popup with email */}
        <div ref={supportRef} style={{ position: 'relative' }}>
          <span
            style={navLinkStyle(supportOpen)}
            onClick={() => setSupportOpen(o => !o)}
            onMouseEnter={e => { if (!supportOpen) e.currentTarget.style.color = '#101828'; }}
            onMouseLeave={e => { if (!supportOpen) e.currentTarget.style.color = '#667085'; }}
          >
            Support
          </span>
          {supportOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 14px)', right: 0,
              background: '#fff', borderRadius: 10,
              boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
              padding: '16px 20px', minWidth: 260, zIndex: 200,
            }}>
              <p style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: 600, color: '#667085', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                Contact Support
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E63E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:support@legaltracker.com" style={{
                  fontFamily: 'Poppins', fontSize: 13, color: '#1E63E9',
                  textDecoration: 'none', fontWeight: 500,
                }}>
                  support@legaltracker.com
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: '#E5E7EB' }} />

        {/* My Account Dropdown */}
        <div ref={accountRef} style={{ position: 'relative' }}>
          <div
            onClick={() => setAccountOpen(o => !o)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          >
            <img
              src={ProfileImage}
              alt="profile"
              style={{
                width: 40, height: 40, borderRadius: '50%', objectFit: 'cover',
                border: accountOpen ? '2px solid #1E63E9' : '2px solid #E5E7EB',
                transition: 'border-color 0.15s',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontFamily: 'Poppins', fontSize: 14, color: '#101828', fontWeight: 500 }}>
                My account
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2.5" strokeLinecap="round"
                style={{ transform: accountOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          {accountOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 14px)', right: 0,
              background: '#fff', borderRadius: 10,
              boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
              padding: '8px 0', minWidth: 200, zIndex: 200,
            }}>
              {/* User info header */}
              <div style={{ padding: '10px 16px 12px', borderBottom: '1px solid #F3F4F6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={ProfileImage} alt="profile" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <p style={{ fontFamily: 'Poppins', fontSize: 13, fontWeight: 600, color: '#101828', margin: 0 }}>
                      Legal SPOC
                    </p>
                    <p style={{ fontFamily: 'Poppins', fontSize: 11, color: '#9CA3AF', margin: 0 }}>
                      spoc@legaltracker.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <button
                onClick={() => { setAccountOpen(false); navigate('/'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '11px 16px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Poppins', fontSize: 13, color: '#DC2626', fontWeight: 500,
                  textAlign: 'left',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}