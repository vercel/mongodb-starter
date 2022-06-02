import { useState, ReactNode } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Directory from "./directory";
import { ResultProps } from "@/lib/api/user";

export default function Layout({
  results,
  children,
}: {
  results: ResultProps[];
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full max-w-screen-2xl mx-auto h-full flex overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        results={results}
      />

      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            {/* Navbar */}
            <Navbar setSidebarOpen={setSidebarOpen} />

            {children}
          </main>
          <div className="hidden md:order-first md:flex md:flex-col">
            <Directory results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}
