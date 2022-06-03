import { UserProps } from '@/lib/api/user';
import { getGradient } from '@/lib/gradients';
import { CheckInCircleIcon, EditIcon, GitHubIcon } from '@/components/icons';
import { useSession } from 'next-auth/react';
import BlurImage from '../blur-image';
import { useState } from 'react';
import Link from 'next/link';

export const profileWidth = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8';

export default function Profile({ user }: { user: UserProps }) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <article className="min-h-[calc(100vh - 20px)]">
      <div>
        <div
          className={`h-32 w-full lg:h-48 
          ${getGradient(user.username)}`}
        />
        <div
          className={`${profileWidth} -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5`}
        >
          <div className="relative group h-24 w-24 rounded-full overflow-hidden sm:h-32 sm:w-32">
            <BlurImage
              src={user.image}
              alt={user.name}
              width={300}
              height={300}
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="flex min-w-0 flex-1 items-center space-x-2">
              <h1 className="text-2xl font-semibold text-white truncate">
                {user.name}
              </h1>
              {user.verified && (
                <CheckInCircleIcon className="w-6 h-6 text-[#0070F3]" />
              )}
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <a
                href={`https://github.com/${user.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center px-4 py-2 border border-[#333333] hover:border-white shadow-sm text-sm font-medium rounded-md text-white font-mono bg-black focus:outline-none focus:ring-0 transition-all"
              >
                <GitHubIcon className="mr-3 h-5 w-5 text-white" />
                <span>View GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-[#333333]">
          <div className={`${profileWidth} mt-10`}>
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`${
                    activeTab === tab.name
                      ? 'border-white text-white'
                      : 'border-transparent text-gray-400'
                  }
                            whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm font-mono`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {session?.username === user.username && (
        <Link href="/settings">
          <a className="fixed bottom-10 right-10 rounded-full border border-[#333333] hover:border-white w-12 h-12 flex justify-center items-center transition-all">
            <EditIcon className="h-4 w-4 text-white" />
          </a>
        </Link>
      )}

      {/* Bio */}
      <div className={`${profileWidth} mt-16`}>
        <h2 className="font-semibold text-lg text-white">Bio</h2>
        <p
          className="mt-3 max-w-2xl text-sm tracking-wider leading-6 text-white font-mono"
          dangerouslySetInnerHTML={{ __html: about }}
        />
      </div>
    </article>
  );
}

const about = `
Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.

Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.`;

const tabs = [
  { name: 'Profile', href: '#', current: true },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Recognition', href: '#', current: false }
];
