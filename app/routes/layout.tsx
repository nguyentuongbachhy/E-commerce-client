import { Suspense, lazy } from "react";
import { Outlet } from "react-router";
import { Header } from "~/components";

// Lazy load the Chatbot component since it's not immediately needed
const Chatbot = lazy(() => import("~/components/Chatbot"));

export default function Layout() {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-slate-900">
      {/* Header with fixed height for better layout stability */}
      <div className="w-full h-16 sm:h-20 flex-shrink-0 sticky top-0 z-40 bg-black shadow-md">
        <Header />
      </div>

      {/* Main content with proper overflow handling */}
      <main className="w-full flex-grow overflow-y-auto overflow-x-hidden scrollbar-thin">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>

      {/* Fixed chatbot with proper z-index and positioning */}
      <div className="fixed bottom-6 right-6 z-50">
        <Suspense fallback={<div className="w-16 h-16 bg-black rounded-md animate-pulse"></div>}>
          <Chatbot />
        </Suspense>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        /* Track */
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1e293b;
        }
        
        /* Handle */
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 3px;
        }

        /* Handle on hover */
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }

        /* For Firefox */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #475569 #1e293b;
        }
      `}</style>
    </div>
  );
}