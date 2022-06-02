import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps } from 'next';
import Layout from '@/components/layout';
import Profile from '@/components/profile';
import { getUser, getAllUsers, UserProps, ResultProps } from '@/lib/api/user';
import { useRouter } from 'next/router';

export default function User({
  results,
  user
}: {
  results: ResultProps[];
  user: UserProps;
}) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout results={results}>
      <Profile user={user} />
    </Layout>
  );
}

interface Params extends ParsedUrlQuery {
  username: string;
}

export const getStaticPaths = async () => {
  const results = await getAllUsers();
  const paths = results.flatMap(({ users }) =>
    users.map((user) => ({ params: { username: user.username } }))
  );
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { username } = context.params as Params; // https://wallis.dev/blog/nextjs-getstaticprops-and-getstaticpaths-with-typescript
  const results = await getAllUsers();
  const user = await getUser(username);

  if (!user) return { notFound: true, revalidate: 10 };

  return {
    props: {
      key: username,
      results,
      user
    },
    revalidate: 10
  };
};
