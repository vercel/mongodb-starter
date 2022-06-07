import Meta from '@/components/layout/meta';
import Link from 'next/link';
import { DirectoryIcon } from '@/components/icons';

export default function Custom404() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <Meta
        props={{
          title: '404 | MongoDB Starter Kit',
          description:
            'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
          ogImage:
            'https://assets.vercel.com/image/upload/v1654626375/twitter-cards/mongo-integration-starter.png',
          ogUrl: 'https://mongodb.vercel.app/404'
        }}
      />
      <div className="absolute top-6 left-6">
        <Link href="/">
          <a>
            <div className="bg-dark-accent-1 hover:bg-dark-accent-2 transition-all rounded-2xl h-12 w-12 flex justify-center items-center">
              <DirectoryIcon className="text-white" />
            </div>
          </a>
        </Link>
      </div>
      <h1 className="text-2xl font-light text-white">
        404 <span className="mx-3 text-4xl">|</span> User Not Found
      </h1>
    </div>
  );
}
