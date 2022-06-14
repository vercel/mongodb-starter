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
  user,
  isClusterReady
}: {
  user: UserProps;
  isClusterReady: boolean;
}) {
  if (!isClusterReady) {
    return <ClusterProvisioning />;
  }
  return <Profile user={user} settings={false} />;
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
