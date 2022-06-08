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
import ClusterProvisioning from '@/components/layout/cluster-provisioning';

export default function Home({
  results,
  totalUsers,
  user,
  isClusterReady
}: {
  results: ResultProps[];
  totalUsers: number;
  user: UserProps;
  isClusterReady: boolean;
}) {
  const ogUrl = 'https://mongodb.vercel.app';
  const meta = {
    title: 'MongoDB Starter Kit',
    description:
      'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
    ogImage: `https://assets.vercel.com/image/upload/v1654626375/twitter-cards/mongo-integration-starter.png`,
    ogUrl
  };

  if (!isClusterReady) {
    return <ClusterProvisioning />;
  }
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
  try {
    const results = await getAllUsers();
    const totalUsers = await getUserCount();
    const firstUser = await getFirstUser();

    return {
      props: {
        results,
        totalUsers,
        user: firstUser,
        isClusterReady: true
      },
      revalidate: 60
    };
  } catch (e) {
    return {
      props: {
        results: [],
        totalUsers: 0,
        user: {},
        isClusterReady: false
      },
      revalidate: 60
    };
  }
};
