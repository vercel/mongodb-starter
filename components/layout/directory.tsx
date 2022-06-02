import { FilterIcon, SearchIcon } from '@heroicons/react/solid';
import { ResultProps } from '@/lib/api/user';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { useState } from 'react';
import { Check } from '@/components/icons';

export default function Directory({ results }: { results: ResultProps[] }) {
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
    <aside className="flex-shrink-0 w-full sm:w-96 h-full overflow-scroll border-r border-gray-200">
      <div className="px-6 pt-6 pb-4">
        <Link href="/">
          <a className="text-lg font-medium text-gray-900">Directory</a>
        </Link>
        <p className="mt-1 text-sm text-gray-600">
          Search directory of 3,018 employees
        </p>
        <form className="mt-6 flex space-x-4" action="#">
          <div className="flex-1 min-w-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="focus:ring-gray-800 focus:border-gray-800 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      {/* Directory list */}
      <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
        {data && data.length > 0 ? (
          data.map(({ _id: letter, users }) => (
            <div key={letter} className="relative">
              <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500 uppercase">
                <h3>{letter}</h3>
              </div>
              <ul role="list" className="relative z-0 divide-y divide-gray-200">
                {users.map((user) => (
                  <li key={user.username}>
                    <Link href={`/${user.username}`}>
                      <a>
                        <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-0">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.image}
                              alt=""
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <div className="flex items-center space-x-1">
                              <p className="text-sm font-medium text-gray-900">
                                {user.name}
                              </p>
                              {user.verified && (
                                <Check className="w-4 h-4 text-[#0070F3]" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500 truncate">
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
