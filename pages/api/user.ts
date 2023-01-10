import type { NextApiRequest, NextApiResponse } from 'next';
import { searchUser, updateUser } from 'lib/api/user';
import { getSession } from 'next-auth/react';
import { getMdxSource } from 'lib/api/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const result = await searchUser(req.query.query as string);
      return res.status(200).json(result);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString()
      });
    }
  } else if (req.method === 'PUT') {
    const { username, bio } = req.body;
    const session = await getSession({ req });
    if (!session || session.username !== username) {
      return res.status(401).json({
        error: 'Unauthorized'
      });
    }
    try {
      const result = await updateUser(username, bio);
      if (result) {
        await res.revalidate(`/${username}`);
      }
      const bioMdx = await getMdxSource(bio); // return bioMdx to optimistically show updated state
      return res.status(200).json(bioMdx);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString()
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
