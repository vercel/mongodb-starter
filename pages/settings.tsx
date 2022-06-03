import { GetServerSideProps } from 'next';
import Layout from '@/components/layout';
import Profile from '@/components/profile/settings';
import { getUser, getAllUsers, UserProps, ResultProps } from '@/lib/api/user';
import { getSession } from 'next-auth/react';

export default function Settings({
  results,
  user
}: {
  results: ResultProps[];
  user: UserProps;
}) {
  return (
    <Layout results={results}>
      <Profile user={user} />
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
