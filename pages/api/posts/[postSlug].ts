import { NextApiRequest, NextApiResponse } from "next";
import postService from "../__services/post.service";
import { validateMethod } from "../__utils/http.utils";

/**
 * /api/posts/[slug]
 *  slug 에 해당하는 포스트를 가져옵니다
 */
function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`Got request! ${req?.query?.postSlug?.toString()}`);
  console.log(req);
  const slug = req.query.postSlug?.toString() || "";
  const post = postService.getPost(slug);

  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  res.status(200).send(post);
}

export default validateMethod("GET", handler);
