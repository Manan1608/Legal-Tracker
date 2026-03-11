import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Assets ────────────────────────────────────────────────── */
import Logo1 from "../../assets/icons/Logo1.svg";
import Logo2 from "../../assets/icons/Logo2.svg";
import MaskGroup from "../../assets/icons/mask-group.svg";
import MaskGroup1 from "../../assets/icons/mask-group1.svg";

/* ─── Eye Icon ──────────────────────────────────────────────── */
const EyeIcon = ({ slashed }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        {slashed && <line x1="1" y1="1" x2="23" y2="23" />}
    </svg>
);

/* ================================================================
   LOGIN PAGE
   ================================================================ */
export default function LoginPage() {
    const navigate = useNavigate();

    /* ─── State ───────────────────────────────────────────────── */
    const [activeTab, setActiveTab] = useState("password"); // "password" | "otp"
    const [otpStep, setOtpStep] = useState("generate");      // "generate" | "verify"
    const [showPwd, setShowPwd] = useState(false);

    // form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);

    const otpRefs = [useRef(), useRef(), useRef(), useRef()];

    /* ─── Handlers ────────────────────────────────────────────── */
    function switchToPassword() {
        setActiveTab("password");
        setOtpStep("generate");
    }

    function switchToOtp() {
        setActiveTab("otp");
        setOtpStep("generate");
    }

    function handlePasswordSignIn() {
        if (!email.trim() || !password.trim()) {
            alert("Please fill in all fields");
            return;
        }
        navigate("/dashboard");
    }

    function handleGenerateOtp() {
        if (mobile.trim().length !== 10 || isNaN(mobile.trim())) {
            alert("Enter a valid 10-digit mobile number");
            return;
        }
        navigate("/dashboard");
    }

    function handleOtpSignIn() {
        if (otp.join("").length !== 4) {
            alert("Please enter complete OTP");
            return;
        }
        navigate("/dashboard");
    }

    function handleOtpChange(index, value) {
        if (value.length > 1) return;
        const next = [...otp];
        next[index] = value;
        setOtp(next);
        if (value && index < 3) otpRefs[index + 1].current.focus();
    }

    function handleOtpKeyDown(index, e) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs[index - 1].current.focus();
        }
    }

    /* ─── Render ──────────────────────────────────────────────── */
    return (
        <div style={styles.container}>

            {/* ── LEFT SECTION ──────────────────────────────────── */}
            <section style={styles.left}>
                {/* Top logos */}
                <div style={styles.topLogos}>
                    <img src={Logo1} alt="HT Logo" style={styles.htLogo} />
                    <img src={Logo2} alt="Hindustan Logo" style={styles.hindiLogo} />
                </div>

                {/* Blue card */}
                <div style={styles.blueCard}>
                    <h1 style={styles.blueH1}>Welcome to</h1>
                    <h2 style={styles.blueH2}>Customer<br />Portal</h2>
                    <div style={styles.divider} />
                    <p style={styles.blueP}>
                        Access your account using Customer Code,<br />
                        Email, or Phone OTP verification
                    </p>
                </div>
            </section>

            {/* ── RIGHT SECTION ─────────────────────────────────── */}
            <section style={styles.right}>
                <img src={MaskGroup1} alt="Logo" style={styles.rightLogo} />

                <h3 style={styles.heading}>SIGN IN WITH YOUR CREDENTIALS BELOW.</h3>

                {/* Tabs */}
                <div style={styles.tabs}>
                    <span
                        onClick={switchToPassword}
                        style={{
                            ...styles.tab,
                            ...(activeTab === "password" ? styles.tabActive : {}),
                        }}
                    >
                        Login Using Password
                    </span>
                    <span
                        onClick={switchToOtp}
                        style={{
                            ...styles.tab,
                            ...(activeTab === "otp" ? styles.tabActive : {}),
                        }}
                    >
                        Circulation Users Login Using OTP
                    </span>
                </div>

                {/* ── PASSWORD FORM ───────────────────────────────── */}
                {activeTab === "password" && (
                    <div>
                        <label style={styles.label}>Login ID/Code</label>
                        <input
                            type="email"
                            placeholder="DummyEmail@gmail.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={styles.input}
                        />

                        <label style={styles.label}>Password</label>
                        <div style={styles.pwdContainer}>
                            <input
                                type={showPwd ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={{ ...styles.input, marginBottom: 0, paddingRight: 40 }}
                            />
                            <span
                                onClick={() => setShowPwd(p => !p)}
                                style={styles.eyeBtn}
                            >
                                <EyeIcon slashed={showPwd} />
                            </span>
                        </div>

                        <div style={styles.options}>
                            <label style={styles.remember}>
                                <input type="checkbox" style={{ width: 'auto', marginRight: 6, marginBottom: 0 }} />
                                Remember me
                            </label>
                            <a href="#" style={styles.forgot}>Forgot Password?</a>
                        </div>

                        {/* reCAPTCHA placeholder */}
                        <div style={styles.recaptcha}>
                            <div style={{
                                width: 304, height: 78, border: '1px solid #d3d3d3', borderRadius: 4,
                                display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10,
                                background: '#f9f9f9', fontSize: 14, color: '#555',
                            }}>
                                <input type="checkbox" style={{ width: 'auto', marginBottom: 0 }} />
                                I'm not a robot
                            </div>
                        </div>

                        <button onClick={handlePasswordSignIn} style={styles.btn}>
                            Sign In
                        </button>
                    </div>
                )}

                {/* ── OTP GENERATE ────────────────────────────────── */}
                {activeTab === "otp" && otpStep === "generate" && (
                    <div>
                        <label style={styles.label}>Mobile Number</label>
                        <input
                            type="text"
                            placeholder="9999999999"
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                            style={styles.input}
                        />
                        <button onClick={handleGenerateOtp} style={styles.btn}>
                            Generate OTP
                        </button>
                    </div>
                )}

                {/* ── OTP VERIFY ──────────────────────────────────── */}
                {activeTab === "otp" && otpStep === "verify" && (
                    <div>
                        <p style={styles.otpText}>
                            Enter the OTP sent on +91 {mobile}
                        </p>

                        <div style={styles.otpBox}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={otpRefs[i]}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleOtpChange(i, e.target.value)}
                                    onKeyDown={e => handleOtpKeyDown(i, e)}
                                    style={styles.otpInput}
                                />
                            ))}
                        </div>

                        <button onClick={handleOtpSignIn} style={styles.btn}>
                            Sign In
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

/* ================================================================
   STYLES (converted from style.css)
   ================================================================ */
const styles = {
    container: {
        display: "flex",
        width: "100%",
        height: "100vh",
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
    },

    /* ── Left ────────────────────────────────────────────────── */
    left: {
        position: "relative",
        width: "65%",
        height: "100vh",
        backgroundImage: `url(${MaskGroup})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
    },

    topLogos: {
        position: "absolute",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
    },
    htLogo: {
        position: "absolute",
        width: 276, height: 35,
        top: 42, left: 42,
        objectFit: "contain",
    },
    hindiLogo: {
        position: "absolute",
        width: 179, height: 47,
        top: 36, right: 42,
        objectFit: "contain",
    },

    blueCard: {
        position: "absolute",
        width: 759,
        top: "50%",
        left: -29,
        transform: "translateY(-50%)",
        backgroundColor: "rgba(79, 120, 254, 0.71)",
        borderRadius: 24,
        padding: 64,
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 3,
    },
    blueH1: { fontSize: 40, fontWeight: 300, margin: 0 },
    blueH2: { fontSize: 64, fontWeight: 700, lineHeight: 1.1, margin: "12px 0 20px" },
    divider: { width: 60, height: 2, background: "#ffffff", marginBottom: 20 },
    blueP: { fontSize: 18, lineHeight: 1.5, maxWidth: 466, margin: 0 },

    /* ── Right ───────────────────────────────────────────────── */
    right: {
        width: "35%",
        padding: "60px 40px",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflowY: "auto",
    },

    rightLogo: { width: 81, height: 81, marginBottom: 24 },

    heading: {
        fontSize: 13, fontWeight: 600,
        marginBottom: 25, letterSpacing: 0.3,
    },

    /* Tabs */
    tabs: { display: "flex", gap: 25, marginBottom: 30 },
    tab: {
        fontSize: 13, color: "#888", cursor: "pointer",
        paddingBottom: 6, transition: "all 0.3s",
        borderBottom: "3px solid transparent",
    },
    tabActive: { color: "#000", borderBottom: "3px solid #ff7a00" },

    /* Form */
    label: { fontSize: 13, fontWeight: 500, marginBottom: 6, display: "block" },
    input: {
        width: "100%", padding: 10, fontSize: 14,
        marginBottom: 20, border: "1px solid #ccc",
        borderRadius: 4, outline: "none", boxSizing: "border-box",
    },

    pwdContainer: { position: "relative", marginBottom: 20 },
    eyeBtn: {
        position: "absolute", right: 12, top: "50%",
        transform: "translateY(-50%)", cursor: "pointer", color: "#888",
        lineHeight: 0,
    },

    options: {
        display: "flex", justifyContent: "space-between",
        alignItems: "center", fontSize: 12, marginBottom: 20,
    },
    remember: { display: "flex", alignItems: "center", cursor: "pointer" },
    forgot: { textDecoration: "none", color: "#4F78FE" },

    recaptcha: { marginBottom: 20 },

    btn: {
        width: "100%", padding: 12,
        background: "#4F78FE", color: "#ffffff",
        fontSize: 14, fontWeight: 600,
        border: "none", borderRadius: 6, cursor: "pointer",
        transition: "background 0.3s",
    },

    /* OTP */
    otpText: { fontSize: 13, color: "#666", marginBottom: 10 },
    otpBox: { display: "flex", gap: 12, margin: "20px 0" },
    otpInput: {
        width: 42, height: 46, textAlign: "center",
        fontSize: 20, borderRadius: 4, marginBottom: 0,
        border: "1px solid #ccc", outline: "none",
        boxSizing: "border-box",
    },
};
