import AppLayout from "../../layout/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

/* ─── Icons ───────────────────────────────────────────────────── */
const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="#1E63E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
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
    'Case Filed And It\'s Date',
    'Action For PLM',
    'PLM Filed',
    'Case Closed',
    'Case Settled',
];

/* ─── Shared styles ───────────────────────────────────────────── */
const inputStyle = {
    width: '100%',
    height: 50,
    border: '1px solid #E0E0E0',
    borderRadius: 5,
    background: '#FAFAFA',
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 13,
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
    color: '#667085',
    marginBottom: 6,
    textTransform: 'uppercase',
    fontFamily: 'Poppins',
    letterSpacing: '0.3px',
};

/* ─── Mock history data ───────────────────────────────────────── */
const HISTORY = [
    {
        date: '22.12.2025',
        status: 'Notice Issued',
        targetDate: '25.12.2025',
        assign: 'Subodh',
        attachment: 'Filename.Jpeg',
    },
];

/* ─── Upload Icon ─────────────────────────────────────────────── */
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="#1E63E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
);

/* ─── Case Document Types ────────────────────────────────────── */
const CASE_DOC_TYPES = [
    { label: 'All Ro', uploadLabel: 'All ROs' },
    { label: 'Hard Copy Of Ledger', uploadLabel: 'Hard Copy Of Ledger' },
    { label: 'All POD', uploadLabel: 'All POD' },
    { label: 'Mail Communication', uploadLabel: 'Mail Communication' },
    { label: 'Gst Print', uploadLabel: 'Gst Print' },
    {
        label: 'Consignment Number And Date',
        subLabel: '(Attachment Option To Be Added)',
        uploadLabel: 'Consignment Number And Date',
    },
    { label: 'All Invoices', uploadLabel: 'All Invoices' },
    { label: 'Others', uploadLabel: 'Others' },
];

/* ─── Case Documents Tab ─────────────────────────────────────── */
function CaseDocumentsTab() {
    const initChecked = CASE_DOC_TYPES.reduce((acc, d) => {
        acc[d.label] = d.label === 'All Ro';
        return acc;
    }, {});
    const [checked, setChecked] = useState(initChecked);

    const toggle = (label) => setChecked(prev => ({ ...prev, [label]: !prev[label] }));
    const selectedDocs = CASE_DOC_TYPES.filter(d => checked[d.label]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Top area: checkbox list + upload fields side by side */}
            <div style={{ display: 'flex', gap: 64 }}>

                {/* Left — checkbox list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 280 }}>
                    {CASE_DOC_TYPES.map(doc => (
                        <div
                            key={doc.label}
                            onClick={() => toggle(doc.label)}
                            style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', userSelect: 'none' }}
                        >
                            {/* Checkbox */}
                            <div style={{
                                width: 18, height: 18, borderRadius: 3, flexShrink: 0, marginTop: 1,
                                border: checked[doc.label] ? 'none' : '1.5px solid #D0D5DD',
                                background: checked[doc.label] ? '#1E63E9' : '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {checked[doc.label] && (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <span style={{ fontFamily: 'Poppins', fontSize: 13, fontWeight: checked[doc.label] ? 500 : 400, color: '#101828' }}>
                                    {doc.label}
                                </span>
                                {doc.subLabel && (
                                    <span style={{ fontFamily: 'Poppins', fontSize: 11, color: '#667085', marginLeft: 4 }}>
                                        {doc.subLabel}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right — upload fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 0 }}>
                    {selectedDocs.map(doc => (
                        <div key={doc.label} style={{ position: 'relative' }}>
                            <input
                                type="text"
                                readOnly
                                value={doc.uploadLabel}
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

            {/* Remarks textarea */}
            <textarea
                placeholder="Remarks"
                rows={3}
                style={{
                    width: '100%',
                    maxWidth: 940,
                    border: '1px solid #E0E0E0',
                    borderRadius: 5,
                    background: '#FAFAFA',
                    padding: '12px 14px',
                    fontSize: 13,
                    color: '#667085',
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                }}
            />

        </div>
    );
}

export default function CaseDetail() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [status, setStatus] = useState('Notice To Be Issued');

    return (
        <AppLayout>
            <div>

                {/* ── Header ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}
                    >
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

                {/* ── Tabs ── */}
                <div style={{ position: 'relative', marginBottom: 28 }}>
                    <div style={{ display: 'flex', gap: 48 }}>
                        {['overview', 'history', 'documents'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    paddingBottom: 12, position: 'relative',
                                    fontFamily: 'Poppins', fontWeight: 600, fontSize: 16,
                                    color: activeTab === tab ? '#101828' : '#9CA3AF',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {tab.toUpperCase()}
                                {activeTab === tab && (
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#1E63E9' }} />
                                )}
                            </button>
                        ))}
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: '#E5E7EB' }} />
                </div>

                {/* ── OVERVIEW tab ── */}
                {activeTab === 'overview' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                        {/* Row: Status, Notice Issue Date, Notice Attachment, Target Date, Assign */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, alignItems: 'flex-end' }}>

                            {/* STATUS */}
                            <div>
                                <label style={labelStyle}>STATUS</label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        value={status}
                                        onChange={e => setStatus(e.target.value)}
                                        style={{ ...inputStyle, paddingRight: 36, appearance: 'none', cursor: 'pointer', width: '100%' }}
                                    >
                                        {STATUS_OPTIONS.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <div style={{ pointerEvents: 'none', position: 'absolute', top: 0, right: 10, bottom: 0, display: 'flex', alignItems: 'center', color: '#667085' }}>
                                        <ChevronDown />
                                    </div>
                                </div>
                            </div>

                            {/* NOTICE ISSUE DATE */}
                            <div>
                                <label style={labelStyle}>NOTICE ISSUE DATE</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="date"
                                        defaultValue="2025-03-21"
                                        style={{ ...inputStyle, paddingRight: 36, appearance: 'none', width: '100%' }}
                                    />
                                    <div style={{ pointerEvents: 'none', position: 'absolute', top: 0, right: 10, bottom: 0, display: 'flex', alignItems: 'center', color: '#667085' }}>
                                        <CalendarIcon />
                                    </div>
                                </div>
                            </div>

                            {/* NOTICE ATTACHMENT */}
                            <div>
                                <label style={labelStyle}>NOTICE ATTACHMENT</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder=""
                                        style={{ ...inputStyle, paddingRight: 40, width: '100%', cursor: 'pointer' }}
                                        readOnly
                                    />
                                    <div style={{ position: 'absolute', top: 0, right: 12, bottom: 0, display: 'flex', alignItems: 'center', color: '#667085' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* TARGET DATE */}
                            <div>
                                <label style={labelStyle}>TARGET DATE</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="date"
                                        defaultValue="2025-03-21"
                                        style={{ ...inputStyle, paddingRight: 36, appearance: 'none', width: '100%' }}
                                    />
                                    <div style={{ pointerEvents: 'none', position: 'absolute', top: 0, right: 10, bottom: 0, display: 'flex', alignItems: 'center', color: '#667085' }}>
                                        <CalendarIcon />
                                    </div>
                                </div>
                            </div>

                            {/* ASSIGN */}
                            <div>
                                <label style={labelStyle}>ASSIGN</label>
                                <input type="text" defaultValue="Subodh" style={{ ...inputStyle, width: '100%' }} />
                            </div>

                        </div>

                        {/* Remarks textarea */}
                        <div>
                            <textarea
                                placeholder="Remarks"
                                rows={4}
                                style={{
                                    width: '100%',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: 5,
                                    background: '#FAFAFA',
                                    padding: '12px 14px',
                                    fontSize: 13,
                                    color: '#667085',
                                    fontFamily: 'Poppins',
                                    fontWeight: 400,
                                    outline: 'none',
                                    resize: 'vertical',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>

                    </div>
                )}


                {/* ── HISTORY tab ── */}
                {activeTab === 'history' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {HISTORY.map((item, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 32,
                                padding: '16px 20px',
                                background: i % 2 === 0 ? '#F9F9F9' : '#fff',
                                borderRadius: 6,
                                flexWrap: 'wrap',
                            }}>
                                {/* Date */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 120 }}>
                                    <ClockIcon />
                                    <span style={{ fontFamily: 'Poppins', fontSize: 13, color: '#667085' }}>{item.date}</span>
                                </div>

                                {/* Status */}
                                <span style={{ fontFamily: 'Poppins', fontSize: 13, fontWeight: 600, color: '#101828', minWidth: 130 }}>
                                    {item.status}
                                </span>

                                {/* Target Date */}
                                <span style={{ fontFamily: 'Poppins', fontSize: 13, color: '#667085' }}>
                                    Target Date: {item.targetDate}
                                </span>

                                {/* Assign */}
                                <span style={{ fontFamily: 'Poppins', fontSize: 13, color: '#667085' }}>
                                    Assign: {item.assign}
                                </span>

                                {/* Attachment */}
                                <span style={{ fontFamily: 'Poppins', fontSize: 13, color: '#667085' }}>
                                    Attachment: {item.attachment}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── DOCUMENTS tab ── */}
                {activeTab === 'documents' && (
                    <CaseDocumentsTab />
                )}

            </div>
        </AppLayout>
    );
}
