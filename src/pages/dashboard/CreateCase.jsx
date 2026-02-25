import AppLayout from "../../layout/AppLayout";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

/* ─── Icons ─────────────────────────────────────────────────── */
const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const ChevronUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 15-6-6-6 6" />
  </svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

/* ─── Shared Styles -*/
const inputStyle = {
  width: '100%',
  height: 56,
  border: '1px solid #E0E0E0',
  borderRadius: 5,
  background: '#F3F3F3',
  paddingLeft: 14,
  paddingRight: 14,
  fontSize: 14,
  color: '#101828',
  fontFamily: 'Poppins',
  fontWeight: 400,
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: 11,
  fontWeight: 500,
  color: '#101828',
  marginBottom: 8,
  textTransform: 'uppercase',
  fontFamily: 'Poppins',
  letterSpacing: '0.3px',
  whiteSpace: 'nowrap',
};

const selectStyle = {
  ...inputStyle,
  paddingRight: 36,
  appearance: 'none',
  cursor: 'pointer',
};

/* ─── Available Entities ─────────────────────────────────────── */
const ENTITIES = ['HTML', 'HTDS'];

/* ─── Multi-Select Checkbox Dropdown ────────────────────────── */
function MultiSelect({ selected, setSelected }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (item) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
    );
  };

  const label = selected.length === 0 ? 'Select Items' : selected.join(', ');

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          ...inputStyle,
          paddingRight: 36,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
        <span style={{ position: 'absolute', right: 12, display: 'flex', alignItems: 'center', color: '#101828' }}>
          {open ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          background: '#fff',
          border: '1px solid #E0E0E0',
          borderRadius: 5,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          zIndex: 100,
          overflow: 'hidden',
        }}>
          {ENTITIES.map(item => {
            const checked = selected.includes(item);
            return (
              <div
                key={item}
                onClick={() => toggle(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  cursor: 'pointer',
                  background: checked ? '#F8F8F8' : '#fff',
                  borderBottom: '1px solid #F3F3F3',
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  color: '#101828',
                  fontWeight: checked ? 600 : 400,
                }}
              >
                {/* Checkbox */}
                <div style={{
                  width: 18, height: 18,
                  border: checked ? 'none' : '1.5px solid #D0D5DD',
                  borderRadius: 3,
                  background: checked ? '#4CAF50' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Select with Chevron ────────────────────────────────────── */
function SelectField({ children, blueBorder, small }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <select style={{
        ...selectStyle,
        height: small ? 44 : 56,
        border: blueBorder ? '1px solid #1E63E9' : '1px solid #E0E0E0',
        width: '100%',
      }}>
        {children}
      </select>
      <div style={{ pointerEvents: 'none', position: 'absolute', top: 0, right: 12, bottom: 0, display: 'flex', alignItems: 'center', color: '#101828' }}>
        <ChevronDown />
      </div>
    </div>
  );
}

/* ─── Upload Icon ─────────────────────────────────────────────── */
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="#1E63E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

/* ─── Document Types ─────────────────────────────────────────── */
const DOC_TYPES = ['Ledger', 'GST', 'Latest RO'];

/* ─── Documents Tab ──────────────────────────────────────────── */
function DocumentsTab() {
  const [checked, setChecked] = useState({ Ledger: true, GST: false, 'Latest RO': false });

  const toggle = (doc) => setChecked(prev => ({ ...prev, [doc]: !prev[doc] }));

  const selectedDocs = DOC_TYPES.filter(d => checked[d]);

  return (
    <div style={{ display: 'flex', gap: 48, paddingTop: 8 }}>

      {/* Left column — checkbox list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 160 }}>
        {DOC_TYPES.map(doc => (
          <div
            key={doc}
            onClick={() => toggle(doc)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}
          >
            {/* Checkbox */}
            <div style={{
              width: 18, height: 18, borderRadius: 3, flexShrink: 0,
              border: checked[doc] ? 'none' : '1.5px solid #D0D5DD',
              background: checked[doc] ? '#1E63E9' : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {checked[doc] && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{ fontFamily: 'Poppins', fontSize: 13, fontWeight: checked[doc] ? 500 : 400, color: '#101828' }}>
              {doc}
            </span>
          </div>
        ))}
      </div>

      {/* Right column — upload fields for each checked doc */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {selectedDocs.map(doc => (
          <div key={doc} style={{ position: 'relative' }}>
            <input
              type="text"
              readOnly
              value={doc}
              style={{
                width: 280,
                height: 44,
                border: '1px solid #E0E0E0',
                borderRadius: 5,
                background: '#FAFAFA',
                paddingLeft: 14,
                paddingRight: 44,
                fontSize: 13,
                color: '#101828',
                fontFamily: 'Poppins',
                fontWeight: 400,
                outline: 'none',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            />
            <div style={{
              position: 'absolute', top: 0, right: 12, bottom: 0,
              display: 'flex', alignItems: 'center',
              pointerEvents: 'none',
            }}>
              <UploadIcon />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function CreateCase() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedEntities, setSelectedEntities] = useState(['HTML']);

  // Entity amounts state: { entityName: { outstanding, claim } }
  const [entityData, setEntityData] = useState({
    HTML: { outstanding: '5,00,000', claim: '5,00,000' },
    HTDS: { outstanding: '5,00,000', claim: '5,00,000' },
  });

  const updateEntity = (entity, field, value) => {
    setEntityData(prev => ({ ...prev, [entity]: { ...prev[entity], [field]: value } }));
  };

  // Compute totals (strip commas for math)
  const totalOutstanding = selectedEntities.reduce((sum, e) => {
    const v = parseFloat((entityData[e]?.outstanding || '0').replace(/,/g, ''));
    return sum + (isNaN(v) ? 0 : v);
  }, 0);
  const totalClaim = selectedEntities.reduce((sum, e) => {
    const v = parseFloat((entityData[e]?.claim || '0').replace(/,/g, ''));
    return sum + (isNaN(v) ? 0 : v);
  }, 0);
  const fmt = (n) => n.toLocaleString('en-IN');

  return (
    <AppLayout>
      <div>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="#101828" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
          </button>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 20, color: '#101828', textTransform: 'uppercase', margin: 0 }}>
            CREATE CASE
          </h1>
        </div>

        {/* ── Tabs ── */}
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 48 }}>
            {['overview', 'documents'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                paddingBottom: 12, position: 'relative',
                fontFamily: 'Poppins', fontWeight: 600, fontSize: 16,
                color: activeTab === tab ? '#101828' : '#9CA3AF',
                textTransform: 'uppercase',
              }}>
                {tab.toUpperCase()}
                {activeTab === tab && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#1E63E9' }} />}
              </button>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: '#E5E7EB' }} />
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
              <div>
                <label style={labelStyle}>CASE TYPE</label>
                <SelectField><option>Recovery Case</option></SelectField>
              </div>
              <div>
                <label style={labelStyle}>LEGAL ENTITIES/BUSINESSES</label>
                <MultiSelect selected={selectedEntities} setSelected={setSelectedEntities} />
              </div>
              <div>
                <label style={labelStyle}>BUSINESS</label>
                <SelectField><option>Print, Shine</option></SelectField>
              </div>
              <div>
                <label style={labelStyle}>ASSIGN TO (SINGLE INPUT)</label>
                <input type="text" placeholder="Name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>STATUS</label>
                <SelectField blueBorder><option>Notice To Be Issued</option></SelectField>
              </div>
            </div>

            {/* Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', gap: 10 }}>
              <div>
                <label style={labelStyle}>TARGET ACTION DATE</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date" defaultValue="2025-03-21"
                    className="[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    style={{ ...inputStyle, paddingRight: 36, appearance: 'none' }}
                  />
                  <div style={{ pointerEvents: 'none', position: 'absolute', top: 0, right: 12, bottom: 0, display: 'flex', alignItems: 'center', color: '#101828' }}>
                    <CalendarIcon />
                  </div>
                </div>
              </div>
              <div>
                <label style={labelStyle}>EMAIL ID</label>
                <input type="text" defaultValue="abhishek@html.com,anupama@html.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>PHYSICAL ADDRESS</label>
                <input type="text" defaultValue="Lorem Ipsum Has Been The Industry's" style={inputStyle} />
              </div>
            </div>

            {/* ── Entity Rows (one per selected entity) ── */}
            {selectedEntities.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>
                {selectedEntities.map(entity => (
                  <div key={entity}>
                    {/* Entity name heading */}
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 14, color: '#101828', marginBottom: 12 }}>
                      {entity}
                    </div>
                    {/* Entity fields grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, maxWidth: '65%' }}>
                      <div>
                        <label style={labelStyle}>BUSINESS</label>
                        <SelectField><option>Print, Shine</option></SelectField>
                      </div>
                      <div>
                        <label style={labelStyle}>OUTSTANDING AMOUNT</label>
                        <input
                          type="text"
                          value={entityData[entity]?.outstanding || ''}
                          onChange={e => updateEntity(entity, 'outstanding', e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>CLAIM AMOUNT</label>
                        <input
                          type="text"
                          value={entityData[entity]?.claim || ''}
                          onChange={e => updateEntity(entity, 'claim', e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* TOTAL row */}
                {selectedEntities.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 10,
                    maxWidth: '65%',
                    paddingTop: 8,
                  }}>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 14, color: '#101828', display: 'flex', alignItems: 'center' }}>
                      TOTAL
                    </div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 14, color: '#101828', display: 'flex', alignItems: 'center' }}>
                      {fmt(totalOutstanding)}
                    </div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 14, color: '#101828', display: 'flex', alignItems: 'center' }}>
                      {fmt(totalClaim)}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {activeTab === 'documents' && (
          <DocumentsTab />
        )}

      </div>
    </AppLayout>
  );
}