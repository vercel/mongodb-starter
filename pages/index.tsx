import { GetStaticProps } from 'next';
import Profile from '@/components/profile';
import {
  getAllUsers,
  UserProps,
  getUserCount,
  getFirstUser
} from '@/lib/api/user';
import { defaultMetaProps } from '@/components/layout/meta';
import clientPromise from '@/lib/mongodb';

export default function Home({ user }: { user: UserProps }) {
  return <Profile user={user} settings={false} />;
}

export const getStaticProps: GetStaticProps = async () => {
  // You should remove this try-catch block once your MongoDB Cluster is fully provisioned
  try {
    await clientPromise;
  } catch (e: any) {
    if (e.code === 'ENOTFOUND') {
      // cluster is still provisioning
      return {
        props: {
          clusterStillProvisioning: true
        }
      };
    } else {
      throw new Error(`Connection limit reached. Please try again later.`);
    }
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
