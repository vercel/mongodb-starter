import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps } from 'next';
import Layout from '@/components/layout';
import Profile from '@/components/profile';
import {
  getUser,
  getAllUsers,
  UserProps,
  ResultProps,
  getUserCount
} from '@/lib/api/user';
import { useRouter } from 'next/router';
import { LoadingDots } from '@/components/icons';

export default function User({
  results,
  totalUsers,
  user
}: {
  results: ResultProps[];
  totalUsers: number;
  user: UserProps;
}) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        <LoadingDots color="white" />
      </div>
    );
  }
  const ogUrl = `https://mongodb.vercel.app/${user.username}`;
  const meta = {
    title: `${user.name}'s Profile | MongoDB Starter Kit`,
    description:
      'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
    ogImage: `https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`,
    ogUrl
  };

  return (
    <Layout
      meta={meta}
      results={results}
      totalUsers={totalUsers}
      username={user.username}
    >
      <Profile user={user} />
    </Layout>
  );
}

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
      fallback: false
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { username } = context.params as Params;
  const results = await getAllUsers();
  const totalUsers = await getUserCount();
  const user = await getUser(username);
  if (!user) {
    return {
      notFound: true,
      revalidate: 10
    };
  }

  return {
    props: {
      key: username,
      results,
      totalUsers,
      user
    },
    revalidate: 10
  };
};
