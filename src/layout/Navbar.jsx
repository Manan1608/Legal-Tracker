import LogoIcon from "../assets/icons/legal-tracker.svg";
import ProfileImage from "../assets/icons/profile-image.svg";
import PortalToggle from "../components/PortalToggle";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-[40px] pt-[40px]">

      {/* Left Section */}
      <div className="flex items-center gap-[12px]">
        <img src={LogoIcon} alt="logo" className="w-[40px] h-[40px]" />
        <h1 className="text-[32px] font-semibold text-[#101828]">
          Legal Tracker
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-[34px]">

        {/* Portal Toggle */}
        <PortalToggle />

        <span className="text-[#667085] text-[16px]">Home</span>
        <span className="text-[#667085] text-[16px]">Support</span>

        <img
          src={ProfileImage}
          alt="profile"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />

        <div className="flex items-center gap-[5px] text-[16px]">
          <span>My account</span>
          <span className="text-[12px]">▾</span>
        </div>

      </div>

    </div>
  );
}