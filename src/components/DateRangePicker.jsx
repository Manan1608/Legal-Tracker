import { useState, useRef, useEffect } from "react";

/* ── tiny helpers ─────────────────────────────────────────────── */
function fmt(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" });
}

/* ── Calendar icon ────────────────────────────────────────────── */
const CalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="#1E63E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

/* ── Component ────────────────────────────────────────────────── */
export default function DateRangePicker({ className = "" }) {
    const [open, setOpen] = useState(false);
    const [from, setFrom] = useState("2022-12-28");
    const [to, setTo] = useState("2023-01-10");
    const ref = useRef(null);

    /* close on outside click */
    useEffect(() => {
        function handler(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const label = from && to ? `${fmt(from)} – ${fmt(to)}` : "Select range";

    return (
        <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
            {/* Trigger button */}
            <button
                onClick={() => setOpen(o => !o)}
                className={className}
                style={{
                    display: "flex", alignItems: "center", gap: 8,
                    cursor: "pointer", background: "#fff",
                    fontFamily: "Poppins", fontSize: 14, color: "#101828",
                    whiteSpace: "nowrap",
                }}
            >
                <CalIcon />
                {label}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="#667085" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {/* Dropdown */}
            {open && (
                <div style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 200,
                    background: "#fff", borderRadius: 12,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
                    padding: "24px 24px 20px",
                    minWidth: 280,
                    fontFamily: "Poppins",
                }}>
                    <p style={{ fontWeight: 600, fontSize: 13, color: "#101828", marginBottom: 16 }}>
                        Select Date Range
                    </p>

                    {/* From */}
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#667085", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                        From
                    </label>
                    <input
                        type="date"
                        value={from}
                        onChange={e => setFrom(e.target.value)}
                        style={{
                            width: "100%", height: 40,
                            border: "1.5px solid #D0E7FD", borderRadius: 8,
                            padding: "0 12px", marginBottom: 16,
                            fontFamily: "Poppins", fontSize: 13, color: "#101828",
                            outline: "none", boxSizing: "border-box",
                        }}
                    />

                    {/* To */}
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#667085", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                        To
                    </label>
                    <input
                        type="date"
                        value={to}
                        min={from}
                        onChange={e => setTo(e.target.value)}
                        style={{
                            width: "100%", height: 40,
                            border: "1.5px solid #D0E7FD", borderRadius: 8,
                            padding: "0 12px", marginBottom: 20,
                            fontFamily: "Poppins", fontSize: 13, color: "#101828",
                            outline: "none", boxSizing: "border-box",
                        }}
                    />

                    {/* Apply */}
                    <button
                        onClick={() => setOpen(false)}
                        style={{
                            width: "100%", height: 38,
                            background: "#1E63E9", color: "#fff",
                            border: "none", borderRadius: 8, cursor: "pointer",
                            fontFamily: "Poppins", fontSize: 14, fontWeight: 500,
                        }}
                    >
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
}
