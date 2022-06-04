import { GetServerSideProps } from 'next';
import Layout from '@/components/layout';
import Profile from '@/components/profile';
import { getUser, getAllUsers, UserProps, ResultProps } from '@/lib/api/user';
import { getSession } from 'next-auth/react';

export default function Settings({
  results,
  user
}: {
  results: ResultProps[];
  user: UserProps;
}) {
  const meta = {
    title: 'Settings | MongoDB Starter Kit',
    description:
      'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
    ogImage: 'https://mongodb.vercel.sh/thumbnail.png',
    ogUrl: 'https://mongodb.vercel.sh/'
  };
  return (
    <Layout meta={meta} results={results}>
      <Profile settings={true} user={user} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const results = await getAllUsers();
  const session = await getSession({ req });
  if (!session)
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  // @ts-expect-error
  const user = await getUser(session.username);

  return {
    props: {
      results,
      user
    }
  };
};
