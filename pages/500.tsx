import Meta, { defaultMetaProps } from '@/components/layout/meta';
export { getStaticProps } from '.';

export default function Custom500() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <Meta
        props={{
          ...defaultMetaProps,
          title: '500 | MongoDB Starter Kit',
          ogUrl: 'https://mongodb.vercel.app/500'
        }}
      />
      <h1 className="text-2xl font-light text-white">
        500 <span className="mx-3 text-4xl">|</span> Internal Server Occured
      </h1>
    </div>
  );
}
