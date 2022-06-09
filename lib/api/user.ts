import connectToMongo from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface UserProps {
  name: string;
  username: string;
  email: string;
  image: string;
  bio: string;
  bioMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  followers: number;
  verified: boolean;
}

export interface ResultProps {
  _id: string;
  users: UserProps[];
}

export async function getMdxSource(postContents: string) {
  // Use remark plugins to convert markdown into HTML string
  const processedContent = await remark()
    // Native remark plugin that parses markdown into MDX
    .use(remarkMdx)
    .process(postContents);

  // Convert converted html to string format
  const contentHtml = String(processedContent);

  // Serialize the content string into MDX
  const mdxSource = await serialize(contentHtml);

  return mdxSource;
}

export const placeholderBio = `
Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.

Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.`;

export async function getUser(username: string): Promise<UserProps | null> {
  const client = await connectToMongo();
  const collection = client.db('test').collection('users');
  const results = await collection.findOne(
    { username },
    { projection: { _id: 0, emailVerified: 0 } }
  );
  if (results) {
    return {
      ...results,
      bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}

export async function getFirstUser(): Promise<UserProps | null> {
  const client = await connectToMongo();
  const collection = client.db('test').collection('users');
  const results = await collection.findOne(
    {},
    {
      projection: { _id: 0, emailVerified: 0 }
    }
  );
  return {
    ...results,
    bioMdx: await getMdxSource(results.bio || placeholderBio)
  };
}

export async function getAllUsers(search?: string): Promise<ResultProps[]> {
  const client = await connectToMongo();
  const collection = client.db('test').collection('users');
  return await collection
    .aggregate([
      ...(search && search.length > 0
        ? [
            {
              $search: {
                index: 'users-index',
                compound: {
                  should: [
                    {
                      autocomplete: {
                        query: search,
                        path: 'name',
                        fuzzy: {
                          maxExpansions: 100
                        }
                      }
                    },
                    {
                      autocomplete: {
                        query: search,
                        path: 'username',
                        fuzzy: {
                          maxExpansions: 100
                        }
                      }
                    },
                    {
                      autocomplete: {
                        query: search,
                        path: 'email',
                        fuzzy: {
                          maxExpansions: 100
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        : []),
      {
        //sort by follower count
        $sort: {
          followers: -1
        }
      },
      {
        $limit: 50
      },
      {
        $group: {
          _id: {
            $toLower: { $substrCP: ['$name', 0, 1] }
          },
          users: {
            $push: {
              name: '$name',
              username: '$username',
              email: '$email',
              image: '$image',
              followers: '$followers',
              verified: '$verified'
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        //sort alphabetically
        $sort: {
          _id: 1
        }
      }
    ])
    .toArray();
}

export async function getUserCount(): Promise<number> {
  const client = await connectToMongo();
  const collection = client.db('test').collection('users');
  return await collection.countDocuments();
}

export async function updateUser(username: string, image: string, bio: string) {
  const client = await connectToMongo();
  const collection = client.db('test').collection('users');
  return await collection.updateOne({ username }, { $set: { image, bio } });
}
