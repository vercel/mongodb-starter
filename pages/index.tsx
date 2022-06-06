import { GetStaticProps } from 'next';
import Layout from '@/components/layout';
import Profile from '@/components/profile';
import {
  getAllUsers,
  ResultProps,
  UserProps,
  getUserCount,
  placeholderBio,
  getMdxSource
} from '@/lib/api/user';

export default function Home({
  results,
  totalUsers,
  user
}: {
  results: ResultProps[];
  totalUsers: number;
  user: UserProps;
}) {
  const ogUrl = 'https://mongodb.vercel.app';
  const meta = {
    title: 'MongoDB Starter Kit',
    description:
      'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl
  };
  return (
    <Layout meta={meta} results={results} totalUsers={totalUsers}>
      <Profile user={user} settings={false} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const results = await getAllUsers();
  const totalUsers = await getUserCount();
  const firstUser = {
    ...results[0].users[0],
    bioMdx: await getMdxSource(placeholderBio)
  };

  return {
    props: {
      results,
      totalUsers,
      user: firstUser
    },
    revalidate: 60
  };
};
