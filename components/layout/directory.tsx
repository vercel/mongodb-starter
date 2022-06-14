import { ResultProps } from '@/lib/api/user';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { useState } from 'react';
import { CheckInCircleIcon } from '@/components/icons';
import { DirectoryIcon, SearchIcon } from '@/components/icons';

export default function Directory({
  results,
  totalUsers
}: {
  results: ResultProps[];
  totalUsers: number;
}) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  const { data } = useSWR<ResultProps[]>(
    `api/user?query=${debouncedQuery}`,
    fetcher,
    {
      fallbackData: results,
      keepPreviousData: true
    }
  );

  return (
    <aside className="flex-shrink-0 w-full bg-black sm:w-96 h-full overflow-scroll border-r border-gray-800">
      <div className="px-6 pt-6 pb-0 sticky top-0 bg-black z-20">
        <Link href="/">
          <a>
            <div className="bg-dark-accent-1 hover:bg-dark-accent-2 transition-all rounded-2xl h-12 w-12 flex justify-center items-center">
              <DirectoryIcon className="text-white" />
            </div>
          </a>
        </Link>
        <p className="mt-8 text-2xl text-white font-bold">Directory</p>
        <p className="mt-2 text-sm text-dark-accent-5">
          Search directory of {Intl.NumberFormat('en-us').format(totalUsers)}{' '}
          developers
        </p>
        <form className="py-8 flex space-x-4" action="#">
          <div className="flex-1 min-w-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative shadow-sm border-0 border-b-dark-accent-2 rounded-none border-b-[1px] ">
              <div className="absolute bg-black inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-dark-accent-3" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="text-white placeholder:text-dark-accent-3 focus:ring-transparent border-none bg-black focus:border-transparent block w-full pl-10 sm:text-sm rounded-md"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      {/* Directory list */}
      <nav
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
        aria-label="Directory"
      >
        {data && data.length > 0 ? (
          data.map(({ _id: letter, users }) => (
            <div key={letter} className="relative">
              <div className="bg-dark-accent-1 px-6 py-1 text-sm font-bold text-white uppercase">
                <h3>{letter}</h3>
              </div>
              <ul role="list" className="relative z-0 directory-divide-y">
                {users.map((user) => (
                  <li key={user.username}>
                    <Link href={`/${user.username}`}>
                      <a>
                        <div className="relative px-6 py-4 flex items-center space-x-3 focus-within:ring-0">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
                            <Image
                              src={user.image}
                              alt={user.name}
                              width={300}
                              height={300}
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2PYsGHDfwAHNAMQumvbogAAAABJRU5ErkJggg=="
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
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
            </div>
          ))
        ) : (
          <div className="px-6 py-6">
            <p className="text-center text-gray-500">No results found</p>
          </div>
        )}
      </nav>
    </aside>
  );
}
