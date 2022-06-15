import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps } from 'next';
import { defaultMetaProps } from '@/components/layout/meta';
import Profile from '@/components/profile';
import { getUser, getAllUsers, UserProps, getUserCount } from '@/lib/api/user';
export { default } from '.';

interface Params extends ParsedUrlQuery {
  username: string;
}

export const getStaticPaths = async () => {
  try {
    const results = await getAllUsers();
    const paths = results.flatMap(({ users }) =>
      users.map((user) => ({ params: { username: user.username } }))
    );
    return {
      paths,
      fallback: true
    };
  } catch (e) {
    return {
      paths: [],
      fallback: true
    };
  }
};

import connectToMongo from '@/lib/mongodb';

export const getStaticProps: GetStaticProps = async (context) => {
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

  const { username } = context.params as Params;
  const user = await getUser(username);
  if (!user) {
    return {
      notFound: true,
      revalidate: 10
    };
  }

  const results = await getAllUsers();
  const totalUsers = await getUserCount();

  const ogUrl = `https://mongodb.vercel.app/${user.username}`;
  const meta = {
    ...defaultMetaProps,
    title: `${user.name}'s Profile | MongoDB Starter Kit`,
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl: `https://mongodb.vercel.app/${user.username}`
  };

  return {
    props: {
      meta,
      results,
      totalUsers,
      user
    },
    revalidate: 10
  };
};
