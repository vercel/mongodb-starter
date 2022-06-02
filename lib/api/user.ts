import connectToMongo from '@/lib/mongodb';

export interface UserProps {
  name: string;
  username: string;
  email: string;
  image: string;
  followers: number;
}

export interface ResultProps {
  _id: string;
  users: UserProps[];
}

export async function getUser(username: string): Promise<UserProps> {
  const client = await connectToMongo;
  const collection = client.db('test').collection('users');
  return await collection.findOne(
    { username },
    { projection: { _id: 0, emailVerified: 0 } }
  );
}

export async function getAllUsers(search?: string): Promise<ResultProps[]> {
  const client = await connectToMongo;
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
            $toLower: { $substr: ['$name', 0, 1] }
          },
          users: {
            $push: {
              name: '$name',
              username: '$username',
              email: '$email',
              image: '$image',
              followers: '$followers'
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
