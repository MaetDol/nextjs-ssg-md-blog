import { NextApiRequest, NextApiResponse } from 'next';
import postService from '../__services/post.service';
import { validateMethod } from '../__utils/http.utils';

/**
 * /api/posts
 * 모든 포스트의 메타 데이터를 가져옵니다
 */
function handler(req: NextApiRequest, res: NextApiResponse) {
  const postMetadatas = postService.getAllPostMetaData();
  res.status(200).json(postMetadatas);
}

export default validateMethod('GET', handler);
