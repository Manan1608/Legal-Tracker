import AppLayout from "../../layout/AppLayout";
import BagIcon from "../../assets/icons/Bag.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/* ─── Open / Total Items Toggle ──────────────────────────────── */
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
        <select
          className="min-w-[180px] h-[46px] 
               border-2 border-[#D0E7FD] 
               rounded-[9px] px-4 outline-none"
        >
          <option>28 Dec 22 – 10 Jan 23</option>
        </select>

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
                <span className="px-3 py-1 rounded-md text-[11px] bg-[#D1FADF] text-[#027A48]">
                  Written off (31.10.2025)
                </span>
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
                <span className="px-3 py-1 rounded-md text-[11px] bg-[#FEF0C7] text-[#B54708]">
                  Ongoing (31.10.2025)
                </span>
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
                <span className="px-3 py-1 rounded-md text-[11px] bg-[#FEE4E2] text-[#B42318]">
                  Notice to be Issued (31.10.2025)
                </span>
              </td>

              <td className="p-4">Lorem ipsum</td>

            </tr>

          </tbody>

        </table>

      </div>
    </AppLayout>
  );
}