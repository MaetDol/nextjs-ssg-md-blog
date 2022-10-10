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

const postService = {
  getAllPostMetaData,
};
export default postService;
