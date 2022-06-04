import Meta from '@/components/layout/meta';

export default function Custom404() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <Meta
        props={{
          title: '404 | MongoDB Starter Kit',
          description:
            'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
          ogImage:
            'https://assets.vercel.com/image/upload/v1654311846/mongodb-demo-app_i12ysf.png',
          ogUrl: 'https://mongodb.vercel.app/404'
        }}
      />
      <h1 className="text-2xl font-light text-white">
        404 <span className="mx-3 text-4xl">|</span> Page Not Found
      </h1>
    </div>
  );
}
