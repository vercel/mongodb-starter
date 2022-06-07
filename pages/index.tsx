import { GetStaticProps } from 'next';
import Layout from '@/components/layout';
import Profile from '@/components/profile';
import {
  getAllUsers,
  ResultProps,
  UserProps,
  getUserCount,
  getFirstUser
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
    ogImage: `https://mongodb.vercel.app/thumbnail.png`,
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
  const firstUser = await getFirstUser();

  return {
    props: {
      results,
      totalUsers,
      user: firstUser
    },
    revalidate: 60
  };
};
