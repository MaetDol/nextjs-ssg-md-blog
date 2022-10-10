import { NextApiRequest, NextApiResponse } from 'next';
import postService from '../__services/post.service';

/**
 * /api/posts/[slug]
 *  slug 에 해당하는 포스트를 가져옵니다
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug?.toString() || '';
  const post = postService.getPost(slug);

  if (!post) {
    res.status(404).send('Post not found');
    return;
  }

  res.status(200).send(post);
}
