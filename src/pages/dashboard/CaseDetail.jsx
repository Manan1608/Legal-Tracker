import AppLayout from "../../layout/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

/* ─── Icons ───────────────────────────────────────────────────── */
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="#1E63E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const ChevronIcon = ({ up }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: up ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="#1E63E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
);

const CheckCircle = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#22C55E" />
        <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const FileIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E63E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
    </svg>
);

/* ─── Status options ──────────────────────────────────────────── */
const STATUS_OPTIONS = [
    'Action For Notice To Be Issued',
    'Notice To Be Issued',
    'Notice Issued',
    'No Response From Customer',
    'Pre-Legal Mediation To Be Initiated',
    'Pre-Legal Mediation Initiated',
    'Pre-Legal Mediation Non-Starter',
    'Pre-Legal Mediation - Allowed',
    'Case To Be Filed',
    'Case Filed',
    'Case Decreed',
    'Case Closed',
    'Case Settled',
];

/* ─── Section Header ──────────────────────────────────────────── */
function SectionHeader({ title, open, onToggle }) {
    return (
        <div
            onClick={onToggle}
            style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: '#F0F0F0', borderRadius: open ? '8px 8px 0 0' : 8,
                padding: '12px 20px', cursor: 'pointer', userSelect: 'none',
            }}
        >
            <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 13, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                {title}
            </span>
            <ChevronIcon up={open} />
        </div>
    );
}

/* ─── File Cell ───────────────────────────────────────────────── */
function FileCell({ label, uploaded, onView }) {
    return (
        <div style={{
            border: uploaded ? '1.5px solid #E0E0E0' : '1.5px solid #E0E0E0',
            borderRadius: 8, padding: '10px 14px',
            background: '#fff', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
            gap: 8,
        }}>
            <div style={{ flex: 1, minWidth: 0 }}>
                {label && (
                    <p style={{ fontFamily: 'Poppins', fontSize: 11, color: '#667085', margin: '0 0 4px 0' }}>{label}</p>
                )}
                {uploaded ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <FileIcon />
                        <button onClick={onView} style={{
                            fontFamily: 'Poppins', fontSize: 12, color: '#1E63E9',
                            background: 'none', border: 'none', cursor: 'pointer',
                            padding: 0, textDecoration: 'underline',
                        }}>
                            File Name.Jpeg
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontFamily: 'Poppins', fontSize: 12, color: '#9CA3AF' }}>Upload file</span>
                    </div>
                )}
            </div>
            {uploaded ? <CheckCircle /> : (
                <div style={{ color: '#9CA3AF' }}><UploadIcon /></div>
            )}
        </div>
    );
}

/* ─── Document View Modal ─────────────────────────────────────── */
function DocumentViewModal({ onClose }) {
    return (
        <div onClick={onClose} style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <div onClick={e => e.stopPropagation()} style={{
                background: '#fff', borderRadius: 16,
                padding: '36px 40px', width: 520,
                position: 'relative', fontFamily: 'Poppins',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}>
                {/* Close */}
                <button onClick={onClose} style={{
                    position: 'absolute', top: 16, right: 16,
                    background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0,
                }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                </button>

                <h2 style={{ fontWeight: 700, fontSize: 20, color: '#101828', margin: '0 0 24px 0' }}>DOCUMENT VIEW</h2>

                {/* Document preview placeholder */}
                <div style={{
                    border: '1.5px solid #E0E0E0', borderRadius: 10,
                    height: 200, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', background: '#F9FAFB',
                    marginBottom: 28, overflow: 'hidden',
                }}>
                    {/* Aadhaar-style placeholder */}
                    <div style={{ textAlign: 'center', padding: 20, width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#E5E7EB' }} />
                            <div>
                                <div style={{ width: 60, height: 8, background: '#FFA500', borderRadius: 4, marginBottom: 4 }} />
                                <div style={{ width: 40, height: 8, background: '#138808', borderRadius: 4, marginBottom: 4 }} />
                                <div style={{ width: 50, height: 8, background: '#FF9933', borderRadius: 4 }} />
                            </div>
                            <div style={{ width: 50, height: 50, borderRadius: 4, background: '#E5E7EB' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <div style={{ width: 50, height: 60, background: '#D1D5DB', borderRadius: 4, flexShrink: 0 }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ height: 8, background: '#E5E7EB', borderRadius: 4, marginBottom: 6 }} />
                                <div style={{ height: 8, background: '#E5E7EB', borderRadius: 4, marginBottom: 6, width: '80%' }} />
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', letterSpacing: 3 }}>XXXX XXXX XXXX</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                    <button style={{
                        width: 160, height: 46, background: '#1E63E9', color: '#fff',
                        border: 'none', borderRadius: 8, cursor: 'pointer',
                        fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,
                    }}>
                        Verify
                    </button>
                    <button style={{
                        width: 160, height: 46, background: '#2563EB', color: '#fff',
                        border: 'none', borderRadius: 8, cursor: 'pointer',
                        fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,
                    }}>
                        Send Back
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─── Document Grid Section ───────────────────────────────────── */
function DocGrid({ title, docs }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div style={{ marginBottom: 24 }}>
            {title && (
                <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 12, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 12 }}>
                    {title}
                </p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {docs.map((doc, i) => (
                    <FileCell key={i} label={doc.label} uploaded={doc.uploaded} onView={() => setShowModal(true)} />
                ))}
            </div>
            {showModal && <DocumentViewModal onClose={() => setShowModal(false)} />}
        </div>
    );
}

/* ─── Recovery Cases docs ─────────────────────────────────────── */
const RECOVERY_DOCS = [
    { label: 'Ledger entity wise/Business wise\n(for notice only softcopy)', uploaded: true },
    { label: 'Any latest RO (for notice only soft copy)', uploaded: true },
    { label: 'KYC documents (PAN, GST – all pages, Aadhar', uploaded: true },
    { label: 'All Invoices and PODs', uploaded: true },
    { label: 'All ROs', uploaded: true },
    { label: 'mail communication', uploaded: true },
    { label: 'Hardcopy despatch consignment number upload', uploaded: true },
    { label: 'Remark', uploaded: true },
];

/* ─── Case U/S 138 NI Act docs ───────────────────────────────── */
const NI_ACT_DOCS = [
    { label: 'Bounced with memo (original at the time of case filling)', uploaded: true },
    { label: 'Ledger entity wise/business wise', uploaded: true },
    { label: 'KYC documents (PAN, GST – all pages, Aadhar', uploaded: true },
    { label: 'Any latest RO', uploaded: true },
    { label: 'All Invoices and PODs', uploaded: true },
    { label: 'All ROs', uploaded: true },
    { label: 'mail communication', uploaded: true },
    { label: 'Hardcopy despatch consignment number upload', uploaded: true },
    { label: 'Remark', uploaded: false },
];

/* ─── Shared field style ──────────────────────────────────────── */
const fieldStyle = {
    width: '100%', height: 46,
    border: '1px solid #E0E0E0', borderRadius: 6,
    background: '#FAFAFA', paddingLeft: 14, paddingRight: 14,
    fontSize: 13, color: '#101828',
    fontFamily: 'Poppins', fontWeight: 400,
    outline: 'none', boxSizing: 'border-box',
};

const labelStyle = {
    display: 'block', fontSize: 11, fontWeight: 600,
    color: '#667085', marginBottom: 5,
    textTransform: 'uppercase', fontFamily: 'Poppins',
    letterSpacing: '0.3px',
};

/* ================================================================
   CASE DETAIL PAGE
   ================================================================ */
export default function CaseDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [customerOpen, setCustomerOpen] = useState(true);
    const [docOpen, setDocOpen] = useState(true);
    const [closureOpen, setClosureOpen] = useState(true);
    const [hearingOpen, setHearingOpen] = useState(true);
    const [status, setStatus] = useState('Action For Notice To Be Issued');
    const [statusDropOpen, setStatusDropOpen] = useState(false);

    // Derived status helpers
    const isCaseToBeFiled = status === 'Case To Be Filed';
    const isCaseFiled     = status === 'Case Filed';
    const isCaseDecreed   = status === 'Case Decreed';
    const isCaseSettled   = status === 'Case Settled';
    const isCaseClosed    = status === 'Case Closed';
    const showHearingDate = isCaseFiled || isCaseDecreed;
    const showCaseClosure = isCaseClosed;
    const showSettlement  = isCaseSettled;

    // Status badge color
    const statusBg = (() => {
        if (isCaseSettled) return '#BDFFA0';     // green
        if (isCaseToBeFiled || isCaseFiled) return '#FFF3B0'; // yellow
        if (isCaseClosed || isCaseDecreed) return '#BDFFA0'; // green
        return '#BDFFA0'; // default green
    })();

    return (
        <AppLayout>
            <div style={{ paddingBottom: 60 }}>

                {/* ── Header ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                            fill="none" stroke="#101828" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 22, color: '#101828', margin: 0 }}>
                        {id || '100562567'}
                    </h1>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 0 }}>
                        <EditIcon />
                    </button>
                </div>

                {/* ══════════════════════════════════════════════════════
                    CUSTOMER DETAIL
                ══════════════════════════════════════════════════════ */}
                <div style={{ marginBottom: 16 }}>
                    <SectionHeader title="Customer Detail" open={customerOpen} onToggle={() => setCustomerOpen(o => !o)} />
                    {customerOpen && (
                        <div style={{ border: '1px solid #E0E0E0', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '20px 20px 24px', background: '#fff' }}>

                            {/* Row 1: 5 columns */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
                                {[
                                    { label: 'NAME AS PER SAP', value: 'LOREM IPSUM' },
                                    { label: 'FIRM/PROPRIETOR/CORPORATE', value: 'LOREM IPSUM' },
                                    { label: 'PROPRIETOR NAME', value: 'LOREM IPSUM' },
                                    { label: 'NAMES (LIST) OF PARTNERS', value: 'LOREM IPSUM' },
                                    { label: 'NAMES (LIST) OF DIRECTORS', value: 'LOREM IPSUM' },
                                ].map(f => (
                                    <div key={f.label}>
                                        <label style={labelStyle}>{f.label}</label>
                                        <input type="text" defaultValue={f.value} style={fieldStyle} />
                                    </div>
                                ))}
                            </div>

                            {/* Row 2: dynamic columns based on status */}
                            <div style={{ display: 'grid', gap: 14, gridTemplateColumns: (() => {
                                if (isCaseToBeFiled) return '220px 180px 180px 180px';
                                if (showSettlement)  return '180px 180px 180px 180px 180px';
                                return '220px 180px 180px';
                            })() }}>

                                {/* STATUS — custom dropdown */}
                                <div style={{ position: 'relative' }}>
                                    <label style={labelStyle}>STATUS</label>
                                    <div
                                        onClick={() => setStatusDropOpen(o => !o)}
                                        style={{
                                            ...fieldStyle, display: 'flex', alignItems: 'center',
                                            justifyContent: 'space-between', cursor: 'pointer',
                                            background: statusBg, borderColor: statusBg,
                                        }}
                                    >
                                        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>{status}</span>
                                        <ChevronIcon up={statusDropOpen} />
                                    </div>
                                    {statusDropOpen && (
                                        <div style={{
                                            position: 'absolute', top: '100%', left: 0, zIndex: 200,
                                            background: '#fff', borderRadius: 8,
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
                                            padding: '6px 0', minWidth: 260, maxHeight: 320, overflowY: 'auto',
                                        }}>
                                            {STATUS_OPTIONS.map(opt => (
                                                <div key={opt} onClick={() => { setStatus(opt); setStatusDropOpen(false); }}
                                                    style={{
                                                        padding: '10px 16px', cursor: 'pointer',
                                                        fontFamily: 'Poppins', fontSize: 13, color: '#101828',
                                                        background: status === opt ? '#F0F7FF' : 'transparent',
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.background = '#F5F8FF'}
                                                    onMouseLeave={e => e.currentTarget.style.background = status === opt ? '#F0F7FF' : 'transparent'}
                                                >
                                                    {opt}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* TARGET DATE — only for Case To Be Filed */}
                                {isCaseToBeFiled && (
                                    <div>
                                        <label style={labelStyle}>TARGET DATE</label>
                                        <input type="text" defaultValue="LOREM IPSUM" style={fieldStyle} />
                                    </div>
                                )}

                                {/* SETTLEMENT AMOUNT — only for Case Settled */}
                                {showSettlement && (
                                    <div>
                                        <label style={labelStyle}>SETTLEMENT AMOUNT</label>
                                        <input type="text" defaultValue="LOREM IPSUM" style={fieldStyle} />
                                    </div>
                                )}

                                {/* REMARK — only for Case Settled */}
                                {showSettlement && (
                                    <div>
                                        <label style={labelStyle}>REMARK</label>
                                        <input type="text" defaultValue="LOREM IPSUM" style={fieldStyle} />
                                    </div>
                                )}

                                <div>
                                    <label style={labelStyle}>SPOC</label>
                                    <input type="text" defaultValue="LOREM IPSUM" style={fieldStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>BRANCH</label>
                                    <input type="text" defaultValue="LOREM IPSUM" style={fieldStyle} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ══════════════════════════════════════════════════════
                    DOCUMENT CHECKLIST BOX
                ══════════════════════════════════════════════════════ */}
                <div style={{ marginBottom: 16 }}>
                    <SectionHeader title="Document Checklist Box" open={docOpen} onToggle={() => setDocOpen(o => !o)} />
                    {docOpen && (
                        <div style={{ border: '1px solid #E0E0E0', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '20px 20px 24px', background: '#fff' }}>

                            {/* Recovery Cases */}
                            <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 12, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 12 }}>
                                Recovery Cases
                            </p>
                            <DocGrid docs={RECOVERY_DOCS} />

                            <div style={{ borderTop: '1px solid #F0F0F0', margin: '24px 0' }} />

                            {/* Case U/S 138 NI Act */}
                            <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 12, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 12 }}>
                                Case U/S 138 NI Act
                            </p>
                            <DocGrid docs={NI_ACT_DOCS} />

                            {/* Settlement Document — only for Case Settled */}
                            {showSettlement && (
                                <>
                                    <div style={{ borderTop: '1px solid #F0F0F0', margin: '24px 0' }} />
                                    <p style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 12, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 12 }}>
                                        Settlement Document
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                                        <FileCell label="RAH approval on settlement terms" uploaded={false} onView={() => {}} />
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* ══════════════════════════════════════════════════════
                    HEARING DATE — shown for Case Filed / Case Decreed
                ══════════════════════════════════════════════════════ */}
                {showHearingDate && (
                    <div style={{ marginBottom: 16 }}>
                        <SectionHeader title="Hearing Date" open={hearingOpen} onToggle={() => setHearingOpen(o => !o)} />
                        {hearingOpen && (
                            <div style={{ border: '1px solid #E0E0E0', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '20px 20px 24px', background: '#fff' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 14 }}>
                                    <div>
                                        <label style={labelStyle}>HEARING DATE</label>
                                        <input type="text" defaultValue="LOREM IPSUM" style={fieldStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>REMARK</label>
                                        <input type="text" defaultValue="LOREM IPSUM" style={fieldStyle} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ══════════════════════════════════════════════════════
                    CASE CLOSURE — shown for Case Closed
                ══════════════════════════════════════════════════════ */}
                {showCaseClosure && (
                    <div>
                        <SectionHeader title="Case Closure" open={closureOpen} onToggle={() => setClosureOpen(o => !o)} />
                        {closureOpen && (
                            <div style={{ border: '1px solid #E0E0E0', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '20px 20px 24px', background: '#fff' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 14 }}>
                                    <div>
                                        <label style={labelStyle}>AMOUNT COLLECTED</label>
                                        <input type="text" defaultValue="LOREM IPSUM" style={fieldStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>REMARK</label>
                                        <input type="text" defaultValue="LOREM IPSUM" style={fieldStyle} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </AppLayout>
    );
}
