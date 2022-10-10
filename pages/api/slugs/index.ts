import { NextApiRequest, NextApiResponse } from 'next';
import postService from '../__services/post.service';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const slugs = postService.getAllSlugs();

  res.status(200).json(slugs);
}
