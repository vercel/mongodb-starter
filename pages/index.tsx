import { GetStaticProps } from 'next';
import Profile from '@/components/profile';
import {
  getAllUsers,
  UserProps,
  getUserCount,
  getFirstUser
} from '@/lib/api/user';
import { defaultMetaProps } from '@/components/layout/meta';
import connectToMongo from '@/lib/mongodb';

export default function Home({ user }: { user: UserProps }) {
  return <Profile user={user} settings={false} />;
}

export const getStaticProps: GetStaticProps = async () => {
  // You should remove this try-catch block once your MongoDB Cluster is fully provisioned
  try {
    await connectToMongo();
  } catch (e) {
    return {
      props: {
        clusterStillProvisioning: true
      }
    };
  }

  const results = await getAllUsers();
  const totalUsers = await getUserCount();
  const firstUser = await getFirstUser();

  return {
    props: {
      meta: defaultMetaProps,
      results,
      totalUsers,
      user: firstUser
    },
    revalidate: 10
  };
};
