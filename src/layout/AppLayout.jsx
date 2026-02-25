import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex w-full">

        {/* Sidebar */}
        <div className="flex-shrink-0">
          <Sidebar />
        </div>

        {/* Page Content */}
        <main className="flex-1 w-full">
          <div className="max-w-[1400px] mx-auto w-full px-8 py-10">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}