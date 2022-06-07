import { useState, ReactNode } from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';
import Directory from './directory';
import { ResultProps } from '@/lib/api/user';
import Meta, { MetaProps } from './meta';
import Toast from '@/components/layout/toast';

export default function Layout({
  meta,
  results,
  totalUsers,
  username,
  children
}: {
  meta: MetaProps;
  results: ResultProps[];
  totalUsers: number;
  username?: string;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full mx-auto h-screen flex overflow-hidden bg-black">
      <Meta props={meta} />
      <Toast username={username} />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        results={results}
        totalUsers={totalUsers}
      />

      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            {/* Navbar */}
            <Navbar setSidebarOpen={setSidebarOpen} />

            {children}
          </main>
          <div className="hidden md:order-first h-screen md:flex md:flex-col">
            <Directory results={results} totalUsers={totalUsers} />
          </div>
        </div>
      </div>
    </div>
  );
}
