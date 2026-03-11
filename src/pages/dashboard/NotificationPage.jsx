import AppLayout from "../../layout/AppLayout";
import { useNavigate } from "react-router-dom";

/* ─── Bell icon ─────────────────────────────────────────────── */
const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

/* ─── Notification data ─────────────────────────────────────── */
const notifications = [
    {
        id: 1,
        text: "A new document has been submitted for Customer 987654 (SAP Code: 11579) and is pending your approval. Kindly review and approve at your earliest convenience.",
        viewDoc: true,
    },
    {
        id: 2,
        text: "The case for Customer 123546 (SAP Code: 26483) has been closed after successful mediation. The matter has been settled for an amount of ₹2,00,000 (2L). Please update your records accordingly.",
        viewDoc: false,
    },
    {
        id: 3,
        text: "A new document has been submitted for Customer 987654 (SAP Code: 11579) and is pending your approval. Kindly review and approve at your earliest convenience.",
        viewDoc: true,
    },
    {
        id: 4,
        text: "The case for Customer 123546 (SAP Code: 26483) has been closed after successful mediation. The matter has been settled for an amount of ₹2,00,000 (2L). Please update your records accordingly.",
        viewDoc: false,
    },
];

/* ─── Page ──────────────────────────────────────────────────── */
export default function NotificationPage() {
    const navigate = useNavigate();

    return (
        <AppLayout>
            {/* Header */}
            <div className="flex items-center gap-3 mt-4 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 0, padding: 0 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                        fill="none" stroke="#101828" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                </button>
                <h2 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 20, color: "#101828", margin: 0 }}>
                    NOTIFICATION
                </h2>
            </div>

            {/* Notification list */}
            <div style={{
                background: "#fff",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
                {notifications.map((n, i) => (
                    <div
                        key={n.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            padding: "18px 24px",
                            borderBottom: i < notifications.length - 1 ? "1px solid #F2F2F2" : "none",
                        }}
                    >
                        {/* Bell */}
                        <div style={{ flexShrink: 0 }}>
                            <BellIcon />
                        </div>

                        {/* Text */}
                        <p style={{
                            flex: 1,
                            fontFamily: "Poppins",
                            fontSize: 13,
                            fontWeight: 400,
                            color: "#344054",
                            margin: 0,
                            lineHeight: 1.6,
                        }}>
                            {n.text}
                        </p>

                        {/* View Document link */}
                        {n.viewDoc && (
                            <button
                                style={{
                                    flexShrink: 0,
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontFamily: "Poppins",
                                    fontSize: 13,
                                    fontWeight: 500,
                                    color: "#101828",
                                    textDecoration: "underline",
                                    padding: 0,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                View Document
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
