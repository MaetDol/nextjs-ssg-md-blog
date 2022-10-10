import { NextApiRequest, NextApiResponse } from 'next';
import postService from '../__services/post.service';
import { validateMethod } from '../__utils/http.utils';

/**
 *  /api/slugs
 *  slug 목록을 반환합니다
 */
function handler(req: NextApiRequest, res: NextApiResponse) {
  const slugs = postService.getAllSlugs();

  res.status(200).json(slugs);
}

export default validateMethod('GET', handler);
