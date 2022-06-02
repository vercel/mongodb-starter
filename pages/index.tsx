import { GetStaticProps } from "next";
import Layout from "@/components/layout";
import Profile from "@/components/profile";
import { getUser, getAllUsers, ResultProps, UserProps } from "@/lib/api/user";

export default function Home({
  results,
  user,
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

export const getStaticProps: GetStaticProps = async () => {
  const results = await getAllUsers();
  const user = await getUser("steven-tey");
  return {
    props: {
      results,
      user,
    },
    revalidate: 60,
  };
};
