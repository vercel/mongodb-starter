import { GetStaticProps } from 'next';
import Layout from '@/components/layout';
import Profile from '@/components/profile';
import {
  getUser,
  getAllUsers,
  ResultProps,
  UserProps,
  getUserCount
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
  const user = await getUser('steven-tey');

  return {
    props: {
      results,
      totalUsers,
      user
    },
    revalidate: 60
  };
};
