import { GetStaticProps } from 'next';
import Layout from '@/components/layout';
import Profile from '@/components/profile';
import { getUser, getAllUsers, ResultProps, UserProps } from '@/lib/api/user';

export default function Home({
  results,
  user
}: {
  results: ResultProps[];
  user: UserProps;
}) {
  const meta = {
    title: 'MongoDB Starter Kit',
    description:
      'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
    ogImage: 'https://mongodb.vercel.app/thumbnail.png',
    ogUrl: 'https://mongodb.vercel.app/'
  };
  return (
    <Layout meta={meta} results={results}>
      <Profile user={user} settings={false} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const results = await getAllUsers();
  const user = await getUser('steven-tey');
  return {
    props: {
      results,
      user
    },
    revalidate: 60
  };
};
