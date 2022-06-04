import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps } from 'next';
import Layout from '@/components/layout';
import Profile from '@/components/profile';
import { getUser, getAllUsers, UserProps, ResultProps } from '@/lib/api/user';
import { useRouter } from 'next/router';
import { LoadingDots } from '@/components/icons';

export default function User({
  results,
  user
}: {
  results: ResultProps[];
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
  const meta = {
    title: `${user.name}'s Profile | MongoDB Starter Kit`,
    description:
      'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
    ogImage: 'https://mongodb.vercel.app/thumbnail.png',
    ogUrl: 'https://mongodb.vercel.app/'
  };
  return (
    <Layout meta={meta} results={results}>
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
