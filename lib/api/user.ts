import connectToMongo from "@/lib/mongodb";

export interface UserProps {
  name: string;
  username: string;
  email: string;
  image: string;
}

export async function getAllUsers(): Promise<UserProps[]> {
  const client = await connectToMongo;
  const collection = client.db("test").collection("users");
  return await collection
    .find(
      {},
      {
        projection: {
          _id: 0,
          name: 1,
          username: 1,
          email: 1,
          image: 1,
        },
      }
    )
    .limit(10)
    .toArray();
}

export async function getUsers(query: string) {
  const client = await connectToMongo;
  const collection = client.db("test").collection("users");
  return await collection
    .aggregate([
      {
        $search: {
          index: "users-index",
          autocomplete: {
            query,
            path: "name",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
    ])
    .toArray();
}
