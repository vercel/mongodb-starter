import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { LoadingDots } from '@/components/icons';
import BlurImage from '../blur-image';
import { MenuIcon } from '@heroicons/react/outline';

export default function Navbar({
  setSidebarOpen
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  return (
    <nav
      className="flex items-center justify-between md:justify-end px-4 h-12 sm:px-6 lg:px-8"
      aria-label="Navbar"
    >
      <button
        type="button"
        className="inline-flex md:hidden items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-0"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      {status !== 'loading' &&
        (session?.user ? (
          <button
            className="w-8 h-8 rounded-full overflow-hidden"
            onClick={() => signOut()}
          >
            <BlurImage
              src={
                session.user.image ||
                `https://avatar.tobi.sh/${session.user.name}`
              }
              alt={session.user.name || 'User'}
              width={300}
              height={300}
            />
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={() => {
              setLoading(true);
              signIn('github');
            }}
            className={`${
              loading
                ? 'bg-gray-200 border-gray-300'
                : 'bg-white hover:bg-black border-white'
            } w-16 h-8 py-1 text-black hover:text-white border rounded-md text-sm transition-all`}
          >
            {loading ? <LoadingDots color="gray" /> : 'Log In'}
          </button>
        ))}
    </nav>
  );
}
