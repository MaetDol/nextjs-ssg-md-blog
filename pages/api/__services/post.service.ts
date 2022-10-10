import { readdirSync, readFileSync } from 'fs';
import { getYamlMetaData, parseToAST } from '../__utils/remark';

const POST_DIRECTORY = '__posts';

/**
 *  모든 포스트의 메타데이터를 가져옵니다
 */
function getAllPostMetaData() {
  return getAllPosts().map(getYamlMetaData);
}

/**
 *  모든 포스트를 string 으로 읽어옵니다
 */
function getAllPostsRawString() {
  const filenames = readdirSync(POST_DIRECTORY);
  const files = filenames.map((name) =>
    readFileSync(POST_DIRECTORY + `/${name}`).toString()
  );

  return files;
}

/**
 *  모든 post 를 AST로 가져옵니다
 */
function getAllPosts() {
  return getAllPostsRawString().map(parseToAST);
}

/**
 * slug 가 일치하는 포스트를 가져옵니다
 */
function getPost(slug: string) {
  const posts = getAllPosts().map((postAst) => ({
    ast: postAst,
    meta: getYamlMetaData(postAst),
  }));

  const post = posts.find(({ meta }) => meta?.slug === slug);
  return post;
}

const postService = {
  getAllPostMetaData,
  getPost,
};
export default postService;
