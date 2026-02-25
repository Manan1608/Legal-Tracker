import AppLayout from "../../layout/AppLayout";
import BagIcon from "../../assets/icons/Bag.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/* ─── Calendar Icon ───────────────────────────────────────────── */
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
        fill="none" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

/* ─── Close Button ────────────────────────────────────────────── */
const CloseBtn = ({ onClick }) => (
    <button onClick={onClick} style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0,
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
            fill="none" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
    </button>
);

/* ─── Modal Backdrop ──────────────────────────────────────────── */
const Backdrop = ({ children, onClose }) => (
    <div
        onClick={onClose}
        style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
    >
        <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
);

/* ─── Pre-Legal Mediation Modal ───────────────────────────────── */
function PreLegalModal({ onClose }) {
    return (
        <Backdrop onClose={onClose}>
            <div style={{
                background: '#fff', borderRadius: 20, padding: '40px 44px',
                width: 480, position: 'relative', fontFamily: 'Poppins',
                boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
            }}>
                {/* Close */}
                <div style={{ position: 'absolute', top: 20, right: 20 }}>
                    <CloseBtn onClick={onClose} />
                </div>

                {/* Title */}
                <h2 style={{ fontWeight: 800, fontSize: 24, color: '#101828', margin: '0 0 10px 0', fontFamily: 'Poppins' }}>
                    PRE-LEGAL MEDIATION
                </h2>

                {/* SAP Code */}
                <p style={{ fontSize: 14, color: '#101828', margin: '0 0 28px 0', fontFamily: 'Poppins', fontWeight: 400 }}>
                    100562567
                </p>

                {/* Target Date */}
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#101828', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                    TARGET DATE
                </label>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    border: '1px solid #E0E0E0', borderRadius: 8,
                    padding: '14px 18px', background: '#F5F5F5',
                    marginBottom: 36,
                }}>
                    <CalendarIcon />
                    <input
                        type="text"
                        defaultValue="12.12.2025"
                        style={{
                            border: 'none', background: 'transparent', outline: 'none',
                            fontFamily: 'Poppins', fontSize: 15, fontWeight: 500,
                            color: '#101828', width: '100%',
                        }}
                    />
                </div>

                {/* Assign Button */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button style={{
                        background: '#1E63E9', color: '#fff',
                        fontFamily: 'Poppins', fontSize: 16, fontWeight: 500,
                        border: 'none', borderRadius: 10, cursor: 'pointer',
                        width: 200, height: 50,
                    }}>
                        Assign
                    </button>
                </div>
            </div>
        </Backdrop>
    );
}

/* ─── Close The Case Modal ────────────────────────────────────── */
function CloseTheCaseModal({ onClose }) {
    return (
        <Backdrop onClose={onClose}>
            <div style={{
                background: '#fff', borderRadius: 20, padding: '40px 44px',
                width: 640, position: 'relative', fontFamily: 'Poppins',
                boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
            }}>
                {/* Close */}
                <div style={{ position: 'absolute', top: 20, right: 20 }}>
                    <CloseBtn onClick={onClose} />
                </div>

                {/* Title */}
                <h2 style={{ fontWeight: 800, fontSize: 24, color: '#101828', margin: '0 0 10px 0', fontFamily: 'Poppins' }}>
                    CLOSE THE CASE
                </h2>

                {/* SAP Code */}
                <p style={{ fontSize: 14, color: '#101828', margin: '0 0 28px 0', fontFamily: 'Poppins', fontWeight: 400 }}>
                    100562567
                </p>

                {/* Two-column fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 16, marginBottom: 36 }}>
                    {/* Amount Collected */}
                    <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#101828', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                            AMOUNT COLLECTED
                        </label>
                        <input
                            type="text"
                            defaultValue="LOREM IPSUM"
                            style={{
                                width: '100%', height: 52,
                                border: '1px solid #E0E0E0', borderRadius: 8,
                                background: '#F5F5F5', padding: '0 16px',
                                fontFamily: 'Poppins', fontSize: 14, fontWeight: 500,
                                color: '#101828', outline: 'none', boxSizing: 'border-box',
                            }}
                        />
                    </div>

                    {/* Remark */}
                    <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#101828', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                            REMARK
                        </label>
                        <input
                            type="text"
                            defaultValue="LOREM IPSUM"
                            style={{
                                width: '100%', height: 52,
                                border: '1px solid #E0E0E0', borderRadius: 8,
                                background: '#F5F5F5', padding: '0 16px',
                                fontFamily: 'Poppins', fontSize: 14, fontWeight: 500,
                                color: '#101828', outline: 'none', boxSizing: 'border-box',
                            }}
                        />
                    </div>
                </div>

                {/* Cancel Button */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: '#1E63E9', color: '#fff',
                            fontFamily: 'Poppins', fontSize: 16, fontWeight: 500,
                            border: 'none', borderRadius: 10, cursor: 'pointer',
                            width: 200, height: 50,
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Backdrop>
    );
}

/* ─── Customer Portal Page ────────────────────────────────────── */
export default function CustomerPortal() {
    const navigate = useNavigate();
    const [showPreLegal, setShowPreLegal] = useState(false);
    const [showCloseCase, setShowCloseCase] = useState(false);

    return (
        <AppLayout>
            {/* Modals */}
            {showPreLegal && <PreLegalModal onClose={() => setShowPreLegal(false)} />}
            {showCloseCase && <CloseTheCaseModal onClose={() => setShowCloseCase(false)} />}

            {/* Stats Row */}
            <div className="flex gap-[20px] mt-[20px]">
                <div className="relative w-[340px] h-[79px] bg-white rounded-[14px] shadow-[0px_4px_10px_rgba(0,0,0,0.06)] px-[20px] py-[16px] flex flex-col justify-center">
                    <img src={BagIcon} alt="bag" className="absolute top-[16px] right-[20px] w-[20px] h-[20px]" />
                    <p className="text-[14px] font-semibold text-[#101828]">Active Cases</p>
                    <p className="text-[30px] mt-[6px] text-[#101828] leading-[100%]"
                        style={{ fontFamily: 'Poppins', fontWeight: 700 }}>1,500</p>
                </div>
                <div className="relative w-[340px] h-[79px] bg-white rounded-[14px] shadow-[0px_4px_10px_rgba(0,0,0,0.06)] px-[20px] py-[16px] flex flex-col justify-center">
                    <img src={BagIcon} alt="bag" className="absolute top-[16px] right-[20px] w-[20px] h-[20px]" />
                    <p className="text-[14px] font-semibold text-[#101828]">Total Cases</p>
                    <p className="text-[30px] mt-[6px] text-[#101828] leading-[100%]"
                        style={{ fontFamily: 'Poppins', fontWeight: 700 }}>5,500</p>
                </div>
            </div>

            {/* Search Row */}
            <div className="flex flex-wrap items-center gap-5 mt-6">
                <input
                    className="flex-1 min-w-[250px] h-[46px] border-2 border-[#D0E7FD] rounded-[9px] px-5 outline-none focus:border-[#1E63E9]"
                    placeholder="Search Bar (sap id/ customer name/ SPOC/ Status)"
                />
                <select className="min-w-[180px] h-[46px] border-2 border-[#D0E7FD] rounded-[9px] px-4 outline-none">
                    <option>28 Dec 22 – 10 Jan 23</option>
                </select>
                <button
                    onClick={() => navigate("/create-case")}
                    className="h-[46px] px-8 bg-[#17B3A3] text-white border-2 border-[#D0E7FD] rounded-[9px] font-medium hover:bg-[#149C8F] transition"
                >
                    + CREATE CASE
                </button>
            </div>

            {/* Table Title + Action Buttons */}
            <div className="mt-6 flex items-center justify-between">
                <h3 className="text-base font-semibold text-[#101828]" style={{ fontFamily: 'Poppins' }}>
                    LEGAL TRACKER CUSTOMERS
                </h3>
                <div className="flex gap-6">
                    <button
                        onClick={() => setShowPreLegal(true)}
                        style={{
                            height: 38, padding: '0 20px',
                            background: '#1E63E9', color: '#fff',
                            border: 'none', borderRadius: 8, cursor: 'pointer',
                            fontFamily: 'Poppins', fontSize: 14, fontWeight: 500,
                        }}
                    >
                        Pre-Legal Mediation
                    </button>
                    <button
                        onClick={() => setShowCloseCase(true)}
                        style={{
                            height: 38, padding: '0 20px',
                            background: '#1E63E9', color: '#fff',
                            border: 'none', borderRadius: 8, cursor: 'pointer',
                            fontFamily: 'Poppins', fontSize: 14, fontWeight: 500,
                        }}
                    >
                        Close The Case
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="mt-4 bg-white rounded-xl shadow-sm overflow-x-hidden">
                <table className="w-auto text-[12px] font-normal text-[#101828]">
                    <thead className="text-[#667085] font-semibold border-b border-[#D9D9D9]">
                        <tr className="text-left h-[60px]">
                            <th className="p-4 w-[50px]">
                                <input type="checkbox" className="w-[16px] h-[16px] border-2 border-[#D0D5DD] rounded-sm" />
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
                    <tbody className="[&>tr:nth-child(even)]:bg-[#F9F9F9] [&>tr:nth-child(odd)]:bg-white">
                        <tr className="h-[71px] border-b border-[#E5E5E5]">
                            <td className="p-4"><input type="checkbox" className="w-[16px] h-[16px] border-2 border-[#D0D5DD] rounded-sm" /></td>
                            <td className="p-4 underline cursor-pointer text-[#1E63E9] hover:text-[#1044B0]" onClick={() => navigate('/case/100562567')}>100562567</td>
                            <td className="p-4">100562567</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4"><span className="px-3 py-1 rounded-md text-[11px] bg-[#D1FADF] text-[#027A48]">Written off (31.10.2025)</span></td>
                            <td className="p-4">Lorem ipsum</td>
                        </tr>
                        <tr className="h-[71px] border-b border-[#E5E5E5]">
                            <td className="p-4"><input type="checkbox" className="w-[16px] h-[16px] border-2 border-[#D0D5DD] rounded-sm" /></td>
                            <td className="p-4 underline cursor-pointer text-[#1E63E9] hover:text-[#1044B0]" onClick={() => navigate('/case/100562568')}>100562568</td>
                            <td className="p-4">100562568</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4"><span className="px-3 py-1 rounded-md text-[11px] bg-[#FEF0C7] text-[#B54708]">Ongoing (31.10.2025)</span></td>
                            <td className="p-4">Lorem ipsum</td>
                        </tr>
                        <tr className="h-[71px] border-b border-[#E5E5E5]">
                            <td className="p-4"><input type="checkbox" className="w-[16px] h-[16px] border-2 border-[#D0D5DD] rounded-sm" /></td>
                            <td className="p-4 underline cursor-pointer text-[#1E63E9] hover:text-[#1044B0]" onClick={() => navigate('/case/100562569')}>100562569</td>
                            <td className="p-4">100562569</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4">Lorem ipsum</td>
                            <td className="p-4"><span className="px-3 py-1 rounded-md text-[11px] bg-[#FEE4E2] text-[#B42318]">Notice to be Issued (31.10.2025)</span></td>
                            <td className="p-4">Lorem ipsum</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
