import { UserProps } from '@/lib/api/user';
import { getGradient } from '@/lib/gradients';
import {
  CheckInCircleIcon,
  UploadIcon,
  CheckIcon,
  XIcon,
  GitHubIcon
} from '@/components/icons';
import { useSession } from 'next-auth/react';
import BlurImage from '../blur-image';
import { useState } from 'react';
import Link from 'next/link';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Profile({ user }: { user: UserProps }) {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <article className="min-h-[calc(100vh - 20px)]">
      <div>
        <div
          className={classNames(
            'h-32 w-full lg:h-48',
            getGradient(user.username)
          )}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="relative group h-24 w-24 rounded-full overflow-hidden sm:h-32 sm:w-32">
              <button className="absolute bg-gray-800 bg-opacity-50 hover:bg-opacity-70 w-full h-full z-10 transition-all flex items-center justify-center">
                <UploadIcon className="h-6 w-6 text-white" />
              </button>
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
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-[#333333]">
          <div className="mt-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <div className="fixed bottom-10 right-10 flex space-x-3">
        <button
          className="rounded-full border border-[#0070F3] hover:border-2 w-12 h-12 flex justify-center items-center transition-all"
          onClick={() => alert('saving')}
        >
          <CheckIcon className="h-4 w-4 text-white" />
        </button>
        <Link href={`/${user.username}`}>
          <a className="rounded-full border border-[#333333] hover:border-white w-12 h-12 flex justify-center items-center transition-all">
            <XIcon className="h-4 w-4 text-white" />
          </a>
        </Link>
      </div>

      {/* Description list */}
      {/* <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          {Object.keys(profile.fields).map((field) => (
            <div key={field} className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{field}</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.fields[field]}
              </dd>
            </div>
          ))}
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">About</dt>
            <dd
              className="mt-1 max-w-prose text-sm text-gray-900 space-y-5"
              dangerouslySetInnerHTML={{ __html: profile.about }}
            />
          </div>
        </dl>
      </div> */}
    </article>
  );
}
const tabs = [
  { name: 'Profile', href: '#', current: true },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Recognition', href: '#', current: false }
];
