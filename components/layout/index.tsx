import { useState, ReactNode } from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';
import Directory from './directory';
import { ResultProps } from '@/lib/api/user';
import Meta, { MetaProps } from './meta';
import Toast from '@/components/layout/toast';

export default function Layout({
  results,
  totalUsers,
  username,
  children
}: {
  results: ResultProps[];
  totalUsers: number;
  username?: string;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const ogUrl = 'https://mongodb.vercel.app';
  const meta = {
    title: 'MongoDB Starter Kit',
    description:
      'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
    ogImage: `https://assets.vercel.com/image/upload/v1654626375/twitter-cards/mongo-integration-starter.png`,
    ogUrl
  };

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
