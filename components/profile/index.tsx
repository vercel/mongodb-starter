import { UserProps } from '@/lib/api/user';
import { getGradient } from '@/lib/gradients';
import {
  CheckInCircleIcon,
  CheckIcon,
  EditIcon,
  GitHubIcon,
  LoadingDots,
  UploadIcon,
  XIcon
} from '@/components/icons';
import { useSession } from 'next-auth/react';
import BlurImage from '../blur-image';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TextareaAutosize from 'react-textarea-autosize';

export const profileWidth = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8';

export default function Profile({
  settings,
  user
}: {
  settings?: boolean;
  user: UserProps;
}) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('Profile');
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    username: user.username,
    image: user.image,
    bio: user.bio || ''
  });
  const router = useRouter();
  const settingsPage = settings || router.asPath === '/settings';

  const onDismiss = useCallback(() => {
    if (settingsPage) router.back();
  }, [router]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        router.replace(`/${user.username}`);
        setSaving(false);
      }
    } catch (error) {
      setSaving(false);
      console.error(error);
    }
  }, [data]);

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
            {settingsPage && (
              <button className="absolute bg-gray-800 bg-opacity-50 hover:bg-opacity-70 w-full h-full z-10 transition-all flex items-center justify-center">
                <UploadIcon className="h-6 w-6 text-white" />
              </button>
            )}
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
      {settingsPage ? (
        <div className="fixed bottom-10 right-10 flex space-x-3">
          <button
            className={`${
              saving ? 'cursor-not-allowed' : ''
            } rounded-full border border-[#0070F3] hover:border-2 w-12 h-12 flex justify-center items-center transition-all`}
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? (
              <LoadingDots color="white" />
            ) : (
              <CheckIcon className="h-4 w-4 text-white" />
            )}
          </button>
          <Link
            href={{ pathname: '/', query: { username: user.username } }}
            as={`/${user.username}`}
            shallow
            replace
          >
            <a className="rounded-full border border-[#333333] hover:border-white w-12 h-12 flex justify-center items-center transition-all">
              <XIcon className="h-4 w-4 text-white" />
            </a>
          </Link>
        </div>
      ) : session?.username === user.username ? (
        <Link
          href={{ pathname: '/', query: { settings: true } }}
          as="/settings"
          shallow
          replace
          scroll={false}
        >
          <a className="fixed bottom-10 right-10 rounded-full border border-[#333333] hover:border-white w-12 h-12 flex justify-center items-center transition-all">
            <EditIcon className="h-4 w-4 text-white" />
          </a>
        </Link>
      ) : null}

      {/* Bio */}
      <div className={`${profileWidth} mt-16`}>
        <h2 className="font-semibold text-lg text-white">Bio</h2>
        {settingsPage ? (
          <>
            <TextareaAutosize
              name="description"
              onInput={(e) =>
                setData({
                  ...data,
                  bio: (e.target as HTMLTextAreaElement).value
                })
              }
              className="mt-1 w-full max-w-2xl px-0 text-sm tracking-wider leading-6 text-white bg-black font-mono border-0 border-b border-[#333333] focus:border-white resize-none focus:outline-none focus:ring-0"
              placeholder="No description provided."
              value={data.bio}
            />
            <div className="flex justify-end w-full max-w-2xl">
              <p className="text-gray-400 font-mono text-sm">
                {data.bio.length}/256
              </p>
            </div>
          </>
        ) : (
          <p
            className="mt-3 max-w-2xl text-sm tracking-wider leading-6 text-white font-mono"
            dangerouslySetInnerHTML={{ __html: user.bio || about }}
          />
        )}
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
