import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PortalToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active based on current route
  const isCustomer = location.pathname.startsWith("/customer");
  const active = isCustomer ? "customer" : "legal";

  const toggleState = () => {
    if (active === "legal") navigate("/customer");
    else navigate("/");
  };

  return (
    <div className="flex items-center gap-[12px] p-4" style={{ fontFamily: 'Poppins' }}>
      {/* --- Legal Portal Tab --- */}
      <div className="relative inline-flex flex-col items-center">
        <button
          onClick={() => navigate("/")}
          className={`w-[130px] h-[24px] text-[16px] leading-[100%] tracking-[0%] align-middle flex items-center justify-center rounded-[8px] transition-all duration-300 border-0 outline-none ${active === "legal"
              ? "bg-[#D0E7FD] text-black"
              : "text-gray-400 bg-transparent"
            }`}
          style={{ fontWeight: 400, fontStyle: 'normal' }}
        >
          Legal Portal
        </button>

        {/* Active Blue Underline Indicator */}
        <div
          className={`absolute -bottom-[6px] left-[8px] h-[3px] w-[48px] bg-[#2563EB] rounded-sm transition-opacity duration-300 ${active === "legal" ? "opacity-100" : "opacity-0"
            }`}
        />
      </div>

      {/* --- Toggle Switch --- */}
      <button
        onClick={toggleState}
        className="relative w-[44px] h-[16px] bg-[#7D7F7C] rounded-full mx-[8px] flex items-center cursor-pointer shadow-inner transition-colors border-0 outline-none"
        aria-label="Toggle Portal"
      >
        {/* Toggle Thumb */}
        <div
          className={`absolute w-[16px] h-[16px] bg-[#2563EB] rounded-full ring-[4px] ring-[#A4C7FC] shadow-sm transition-transform duration-300 ease-in-out ${active === "legal" ? "-left-[4px]" : "left-[32px]"
            }`}
        />
      </button>

      {/* --- Customer Portal Tab --- */}
      <div className="relative inline-flex flex-col items-center">
        <button
          onClick={() => navigate("/customer")}
          className={`w-[150px] h-[24px] text-[16px] leading-[100%] tracking-[0%] align-middle flex items-center justify-center rounded-[8px] transition-all duration-300 border-0 outline-none ${active === "customer"
              ? "bg-[#D0E7FD] text-black"
              : "text-gray-400 bg-transparent"
            }`}
          style={{ fontWeight: 400, fontStyle: 'normal' }}
        >
          Customer Portal
        </button>

        {/* Active Blue Underline Indicator */}
        <div
          className={`absolute -bottom-[6px] left-[8px] h-[3px] w-[48px] bg-[#2563EB] rounded-sm transition-opacity duration-300 ${active === "customer" ? "opacity-100" : "opacity-0"
            }`}
        />
      </div>
    </div>
  );
};

export default PortalToggle;