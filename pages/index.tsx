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
import connectToMongo from '@/lib/mongodb';

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
    ogImage: `https://mongodb.vercel.app/og.png`,
    ogUrl
  };
  return (
    <Layout
      meta={meta}
      results={results}
      totalUsers={totalUsers}
      username={user.username}
    >
      <Profile user={user} settings={false} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let isClusterReady = false;
  try {
    await connectToMongo;
    isClusterReady = true;
  } catch (e) {
    console.error(e);
  }

  const results = await getAllUsers();
  const totalUsers = await getUserCount();
  const firstUser = await getFirstUser();

  return {
    props: {
      results,
      totalUsers,
      user: firstUser,
      isClusterReady
    },
    revalidate: 60
  };
};
