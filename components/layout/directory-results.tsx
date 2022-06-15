import Link from 'next/link';
import BlurImage from '../blur-image';
import { UserProps } from '@/lib/api/user';
import { CheckInCircleIcon } from '@/components/icons';

export default function DirectoryResults({ users }: { users: UserProps[] }) {
  return (
    <ul role="list" className="relative z-0 directory-divide-y">
      {users.map((user) => (
        <li key={user.username}>
          <Link href={`/${user.username}`}>
            <a>
              <div className="relative px-6 py-4 flex items-center space-x-3 focus-within:ring-0">
                <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
                  <BlurImage
                    src={user.image}
                    alt={user.name}
                    width={300}
                    height={300}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  <div className="flex items-center space-x-1">
                    <p className="text-sm font-medium text-white truncate">
                      {user.name}
                    </p>
                    {user.verified && (
                      <CheckInCircleIcon className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <p className="text-sm text-dark-accent-5 truncate">
                    @{user.username}
                  </p>
                </div>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
