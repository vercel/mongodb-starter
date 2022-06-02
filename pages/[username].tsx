import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GetStaticProps } from "next";
import Layout from "@/components/layout";
import Profile from "@/components/profile";
import { getUser, getAllUsers, UserProps, ResultProps } from "@/lib/api/user";
import { useRouter } from "next/router";

export default function User({
  results,
  user,
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
  console.log(paths);
  return {
    paths,
    fallback: true,
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
      user,
    },
    revalidate: 10,
  };
};

const profile = {
  name: "Ricardo Cooper",
  imageUrl:
    "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  coverImageUrl:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    Phone: "(555) 123-4567",
    Email: "ricardocooper@example.com",
    Title: "Senior Front-End Developer",
    Team: "Product Development",
    Location: "San Francisco",
    Sits: "Oasis, 4th floor",
    Salary: "$145,000",
    Birthday: "June 8, 1990",
  },
};
