import AppLayout from "../../layout/AppLayout";
import BagIcon from "../../assets/icons/Bag.svg";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import DateRangePicker from "../../components/DateRangePicker";

/* ─── Shared modal wrapper ────────────────────────────────────── */
function Modal({ onClose, children }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 16, padding: '32px 36px',
        width: 680, maxHeight: '90vh', overflowY: 'auto',
        position: 'relative', fontFamily: 'Poppins',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0,
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

/* ─── Upload icon (small) ─────────────────────────────────────── */
const SmUpload = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);

/* ─── Doc Checklist Upload Modal ──────────────────────────────── */
const RECOVERY_UPLOAD = [
  'Ledger entity wise/Business wise\n(for notice only softcopy)',
  'Any latest RO (for notice only soft copy)',
  'KYC documents (PAN, GST – all pages, Aadhar',
  'All Invoices and PODs',
  'All ROs',
  'mail communication',
  'Hardcopy despatch consignment number upload',
  'Remark',
];
const NI_UPLOAD = [
  'Bounced with memo (original at the time of case filing)',
  'Ledger entity wise/business wise',
  'KYC documents (PAN, GST – all pages, Aadhar',
  'Any latest RO',
  'All Invoices and PODs',
  'All ROs',
  'mail communication',
  'Hardcopy despatch consignment number upload',
  'Remark',
];

function DocChecklistModal({ caseId, onClose }) {
  const cell = (label) => (
    <div key={label} style={{
      border: '1px solid #E0E0E0', borderRadius: 8, padding: '10px 12px',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      gap: 8, background: '#fff',
    }}>
      <span style={{ fontSize: 12, color: '#374151', fontFamily: 'Poppins', whiteSpace: 'pre-line', lineHeight: 1.4 }}>
        {label}
      </span>
      <div style={{ flexShrink: 0, marginTop: 2 }}><SmUpload /></div>
    </div>
  );

  const subHead = (t) => (
    <p style={{ fontSize: 11, fontWeight: 700, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '16px 0 10px' }}>{t}</p>
  );

  return (
    <Modal onClose={onClose}>
      <h2 style={{ fontWeight: 700, fontSize: 18, color: '#101828', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
        Document Checklist Box
      </h2>
      {subHead('Recovery Cases')}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {RECOVERY_UPLOAD.map(cell)}
      </div>
      {subHead('Case U/S 138 NI Act')}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {NI_UPLOAD.map(cell)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
        <button onClick={onClose} style={{
          width: 160, height: 44, background: '#1E63E9', color: '#fff',
          border: 'none', borderRadius: 8, cursor: 'pointer',
          fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,
        }}>Upload</button>
      </div>
    </Modal>
  );
}

/* ─── Customer Detail Edit Modal ──────────────────────────────── */
const STATUS_OPTS = [
  'Action For Notice To Be Issued','Notice To Be Issued','Notice Issued',
  'No Response From Customer','Pre-Legal Mediation To Be Initiated',
  'Pre-Legal Mediation Initiated','Pre-Legal Mediation Non-Starter',
  'Pre-Legal Mediation - Allowed','Case To Be Filed','Case Filed',
  'Case Decreed','Case Closed','Case Settled',
];

function CustomerDetailModal({ caseId, onClose }) {
  const [editStatus, setEditStatus] = useState('Notice To Be Issued');

  const fld = { width: '100%', height: 42, border: '1px solid #E0E0E0', borderRadius: 6,
    background: '#FAFAFA', paddingLeft: 12, paddingRight: 12, fontSize: 13,
    color: '#101828', fontFamily: 'Poppins', outline: 'none', boxSizing: 'border-box' };
  const lbl = { display: 'block', fontSize: 10, fontWeight: 700, color: '#667085',
    textTransform: 'uppercase', fontFamily: 'Poppins', letterSpacing: '0.3px', marginBottom: 4 };

  return (
    <Modal onClose={onClose}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, color: '#101828', textTransform: 'uppercase', margin: 0 }}>
          Customer Detail
        </h2>
        <div style={{
          width: 30, height: 30, borderRadius: '50%', background: '#1E63E9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </div>
      </div>
      <p style={{ fontFamily: 'Poppins', fontSize: 13, color: '#667085', margin: '0 0 20px' }}>{caseId}</p>

      {/* Row 1: 3 text fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
        {[['NAME AS PER SAP','LOREM IPSUM'],['FIRM/PROPRIETOR/CORPORATE','LOREM IPSUM'],['PROPRIETOR NAME','LOREM IPSUM']].map(([l,v]) => (
          <div key={l}>
            <label style={lbl}>{l}</label>
            <input type="text" defaultValue={v} style={fld} />
          </div>
        ))}
      </div>

      {/* Row 2: 3 dropdowns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
        {[['NAMES (LIST) OF PARTNERS'],['NAMES (LIST) OF DIRECTORS'],['BRANCH']].map(([l]) => (
          <div key={l}>
            <label style={lbl}>{l}</label>
            <select defaultValue="LOREM IPSUM" style={{ ...fld, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23667085' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', paddingRight: 30 }}>
              <option>LOREM IPSUM</option>
            </select>
          </div>
        ))}
      </div>

      {/* Row 3: Status dropdown + SPOC */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <div>
          <label style={lbl}>STATUS</label>
          <select value={editStatus} onChange={e => setEditStatus(e.target.value)}
            style={{ ...fld, background: '#BDFFA0', borderColor: '#BDFFA0', appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', paddingRight: 30 }}>
            {STATUS_OPTS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label style={lbl}>SPOC</label>
          <input type="text" defaultValue="LOREM IPSUM" style={fld} />
        </div>
      </div>

      {/* Update button */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={onClose} style={{
          width: 200, height: 44, background: '#1E63E9', color: '#fff',
          border: 'none', borderRadius: 8, cursor: 'pointer',
          fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,
        }}>Update Changes</button>
      </div>
    </Modal>
  );
}

/* ─── ⋮ Context Menu ──────────────────────────────────────────── */
function StatusMenu({ caseId }) {
  const [open, setOpen] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const menuItem = (icon, label, onClick) => (
    <button onClick={() => { setOpen(false); onClick(); }} style={{
      display: 'flex', alignItems: 'center', gap: 10, width: '100%',
      padding: '10px 16px', background: 'none', border: 'none',
      cursor: 'pointer', fontFamily: 'Poppins', fontSize: 13,
      color: '#101828', whiteSpace: 'nowrap',
    }} onMouseEnter={e => e.currentTarget.style.background = '#F5F8FF'}
      onMouseLeave={e => e.currentTarget.style.background = 'none'}>
      {icon}{label}
    </button>
  );

  return (
    <>
      {showDocModal && <DocChecklistModal caseId={caseId} onClose={() => setShowDocModal(false)} />}
      {showEditModal && <CustomerDetailModal caseId={caseId} onClose={() => setShowEditModal(false)} />}

      <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
        <button onClick={() => setOpen(o => !o)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '4px 6px', borderRadius: 6, lineHeight: 0,
          color: '#667085',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
          </svg>
        </button>
        {open && (
          <div style={{
            position: 'absolute', top: '100%', right: 0, zIndex: 300,
            background: '#fff', borderRadius: 10,
            boxShadow: '0 8px 28px rgba(0,0,0,0.13)',
            padding: '6px 0', minWidth: 190,
          }}>
            {menuItem(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E63E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
              'Upload Documents', () => setShowDocModal(true)
            )}
            {menuItem(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E63E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/></svg>,
              'Download', () => alert('Download clicked')
            )}
            {menuItem(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E63E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
              'View/Edit', () => setShowEditModal(true)
            )}
          </div>
        )}
      </div>
    </>
  );
}


/* ─── Open / Total Items Toggle ───── */
function ItemsToggle() {
  const [active, setActive] = useState('open');
  const toggle = () => setActive(a => a === 'open' ? 'total' : 'open');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Poppins' }}>

      {/* Open Items */}
      <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          onClick={() => setActive('open')}
          style={{
            height: 24, padding: '0 12px',
            fontSize: 14, fontWeight: 400,
            background: active === 'open' ? '#D0E7FD' : 'transparent',
            color: active === 'open' ? '#101828' : '#9CA3AF',
            borderRadius: 8, border: 'none', outline: 'none', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Open Items
        </button>
        <div style={{
          position: 'absolute', bottom: -6, left: 8,
          height: 3, width: 48, background: '#2563EB', borderRadius: 2,
          opacity: active === 'open' ? 1 : 0, transition: 'opacity 0.2s',
        }} />
      </div>

      {/* Toggle switch */}
      <button
        onClick={toggle}
        style={{
          position: 'relative', width: 44, height: 16,
          background: '#7D7F7C', borderRadius: 999,
          border: 'none', outline: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', margin: '0 8px',
        }}
      >
        <div style={{
          position: 'absolute',
          width: 16, height: 16,
          background: '#2563EB',
          borderRadius: '50%',
          boxShadow: '0 0 0 4px #A4C7FC',
          transition: 'transform 0.3s ease',
          transform: active === 'open' ? 'translateX(-4px)' : 'translateX(32px)',
        }} />
      </button>

      {/* Total Items */}
      <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          onClick={() => setActive('total')}
          style={{
            height: 24, padding: '0 12px',
            fontSize: 14, fontWeight: 400,
            background: active === 'total' ? '#D0E7FD' : 'transparent',
            color: active === 'total' ? '#101828' : '#9CA3AF',
            borderRadius: 8, border: 'none', outline: 'none', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Total Items
        </button>
        <div style={{
          position: 'absolute', bottom: -6, left: 8,
          height: 3, width: 48, background: '#2563EB', borderRadius: 2,
          opacity: active === 'total' ? 1 : 0, transition: 'opacity 0.2s',
        }} />
      </div>

    </div>
  );
}

export default function CentralInitiator() {


  const navigate = useNavigate();


  return (
    <AppLayout>
      {/* Stats Row */}
      <div className="flex gap-[20px] mt-[20px]">
        {/* Active Cases */}
        <div className="relative w-[340px] h-[79px] bg-white rounded-[14px] shadow-[0px_4px_10px_rgba(0,0,0,0.06)] px-[20px] py-[16px] flex flex-col justify-center">
          <img
            src={BagIcon}
            alt="bag"
            className="absolute top-[16px] right-[20px] w-[20px] h-[20px]"
          />
          <p className="text-[14px] font-semibold text-[#101828]">
            Active Cases
          </p>
          <p
            className="text-[30px] mt-[6px] text-[#101828] leading-[100%]"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontStyle: 'normal',
              letterSpacing: '0%',
              verticalAlign: 'middle'
            }}
          >
            1,500
          </p>
        </div>

        {/* Total Cases */}
        <div className="relative w-[340px] h-[79px] bg-white rounded-[14px] shadow-[0px_4px_10px_rgba(0,0,0,0.06)] px-[20px] py-[16px] flex flex-col justify-center">
          <img
            src={BagIcon}
            alt="bag"
            className="absolute top-[16px] right-[20px] w-[20px] h-[20px]"
          />
          <p className="text-[14px] font-semibold text-[#101828]">
            Total Cases
          </p>
          <p
            className="text-[30px] mt-[6px] text-[#101828] leading-[100%]"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontStyle: 'normal',
              letterSpacing: '0%',
              verticalAlign: 'middle'
            }}
          >
            5,500
          </p>
        </div>
      </div>

      {/* Search Row */}
      <div className="flex flex-wrap items-center gap-5 mt-6">

        {/* Search Input */}
        <input
          className="flex-1 min-w-[250px] h-[46px] 
               border-2 border-[#D0E7FD] 
               rounded-[9px] px-5 outline-none
               focus:border-[#1E63E9]"
          placeholder="Search Bar (sap id/ customer name/ SPOC/ Status)"
        />

        {/* Date Select */}
        <DateRangePicker className="min-w-[180px] h-[46px] border-2 border-[#D0E7FD] rounded-[9px] px-4 outline-none" />

        {/* Create Case Button */}
        <button
          onClick={() => navigate("/create-case")}
          className="h-[46px] px-8 
             bg-[#17B3A3] text-white 
             border-2 border-[#D0E7FD]
             rounded-[9px] font-medium
             hover:bg-[#149C8F] hover:border-[#149C8F]
             transition"
        >
          + CREATE CASE
        </button>

      </div>

      {/* Table Title + Toggle */}
      <div className="mt-6 flex items-center gap-[20px]">
        <h3 className="text-base font-semibold text-[#101828]" style={{ fontFamily: 'Poppins' }}>
          LEGAL TRACKER CUSTOMERS
        </h3>

        {/* Open Items / Total Items Toggle */}
        <ItemsToggle />
      </div>

      {/* Table */}
      <div className="mt-4 bg-white rounded-xl shadow-sm overflow-x-hidden">

        <table className="w-auto text-[12px] font-normal text-[#101828]">
          {/* Header */}
          <thead className="text-[#667085] font-semibold border-b border-[#D9D9D9]">
            <tr className="text-left h-[60px]">

              <th className="p-4 w-[50px]">
                <input
                  type="checkbox"
                  className="w-[16px] h-[16px] border-2 border-[#D0D5DD] rounded-sm"
                />
              </th>

              <th className="p-4 w-[87px]">SAP Code</th>
              <th className="p-4 w-[97px]">Unique id</th>
              <th className="p-4 w-[150px]">Name as per SAP</th>
              <th className="p-4 w-[170px]">Firm/Proprietor /Corporate</th>
              <th className="p-4 w-[140px]">Proprietor name</th>
              <th className="p-4 w-[160px]">Names (list) of Partners</th>
              <th className="p-4 w-[120px]">Branch</th>
              <th className="p-4 w-[160px]">Status</th>
              <th className="p-4 w-[120px]">SPOC</th>

            </tr>
          </thead>

          {/* Body */}
          <tbody
            className="
        [&>tr:nth-child(even)]:bg-[#F9F9F9]
        [&>tr:nth-child(odd)]:bg-white
      "
          >

            {/* Row 1 */}
            <tr className="h-[71px] border-b border-[#E5E5E5]">

              <td className="p-4">
                <input
                  type="checkbox"
                  className="w-[16px] h-[16px] border-2 border-[#D0D5DD] rounded-sm"
                />
              </td>

              <td className="p-4 underline cursor-pointer text-[#1E63E9] hover:text-[#1044B0]" onClick={() => navigate('/case/100562567')}>100562567</td>
              <td className="p-4">100562567</td>
              <td className="p-4">Lorem ipsum</td>
              <td className="p-4">Lorem ipsum</td>
              <td className="p-4">Lorem ipsum</td>
              <td className="p-4">Lorem ipsum</td>
              <td className="p-4">Lorem ipsum</td>

              <td className="p-4">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="px-3 py-1 rounded-md text-[11px] bg-[#D1FADF] text-[#027A48]">
                    Written off (31.10.2025)
                  </span>
                  <StatusMenu caseId="100562567" />
                </div>
              </td>

              <td className="p-4">Lorem ipsum</td>

            </tr>

            {/* Row 2 */}
            <tr className="h-[71px] border-b border-[#E5E5E5]">

              <td className="p-4">
                <input
                  type="checkbox"
                  className="w-[16px] h-[16px] border-2 border-[#D0D5DD] rounded-sm"
                />
              </td>

              <td className="p-4 underline cursor-pointer text-[#1E63E9] hover:text-[#1044B0]" onClick={() => navigate('/case/100562568')}>100562568</td>
              <td className="p-4">100562568</td>
              <td className="p-4">Lorem ipsum</td>
              <td className="p-4">Lorem ipsum</td>
              <td className="p-4">Lorem ipsum</td>
              <td className="p-4">Lorem ipsum</td>
              <td className="p-4">Lorem ipsum</td>

              <td className="p-4">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="px-3 py-1 rounded-md text-[11px] bg-[#FEF0C7] text-[#B54708]">
                    Ongoing (31.10.2025)
                  </span>
                  <StatusMenu caseId="100562568" />
                </div>
              </td>

              <td className="p-4">Lorem ipsum</td>

            </tr>

            {/* Row 3 */}
            <tr className="h-[71px] border-b border-[#E5E5E5]">

              <td className="p-4">
                <input
                  type="checkbox"
                  className="w-[16px] h-[16px] border-2 border-[#D0D5DD] rounded-sm"
                />
              </td>

              <td className="p-4 underline cursor-pointer text-[#1E63E9] hover:text-[#1044B0]" onClick={() => navigate('/case/100562569')}>100562569</td>
              <td className="p-4">100562569</td>
              <td className="p-4">Lorem ipsum</td>
              <td className="p-4">Lorem ipsum</td>
              <td className="p-4">Lorem ipsum</td>
              <td className="p-4">Lorem ipsum</td>
              <td className="p-4">Lorem ipsum</td>

              <td className="p-4">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="px-3 py-1 rounded-md text-[11px] bg-[#FEE4E2] text-[#B42318]">
                    Notice to be Issued (31.10.2025)
                  </span>
                  <StatusMenu caseId="100562569" />
                </div>
              </td>

              <td className="p-4">Lorem ipsum</td>

            </tr>

          </tbody>

        </table>

      </div>
    </AppLayout>
  );
}