import path from "path";
import { PostMetaData } from "../../../models/posts.model";
import { readDirSyncAtLocal, readFileSyncAtLocal } from "../__utils/file.utils";
import { getYamlMetaData, parseToAST } from "../__utils/remark.utils";

const POST_DIRECTORY = "__posts";
// @vercel/nft 의 미숙한 동작 때문에, 동적으로(폴더를 읽고, 거기서 파일 목록을 가져오는 등) 파일을 불러오는 경우
// 로컬 파일이 복사되지 않고 누락되는 케이스가 있습니다
// 그 경우 아래와 같이 path.join 명령행을 추가해, 파일 위치를 알 수 있게 명시해주니 잘 복사되네요
// https://github.com/vercel/next.js/discussions/32236#discussioncomment-3029649
path.join(process.cwd(), POST_DIRECTORY);

/**
 *  모든 포스트의 메타데이터를 가져옵니다
 */
function getAllPostMetaData(): PostMetaData[] {
  return getAllPosts()
    .map(getYamlMetaData)
    .filter((meta): meta is PostMetaData => meta !== null);
}

/**
 *  모든 포스트를 string 으로 읽어옵니다
 */
function getAllPostsRawString() {
  const filenames = readDirSyncAtLocal(POST_DIRECTORY);
  const files = filenames.map((name) =>
    readFileSyncAtLocal(POST_DIRECTORY + `/${name}`).toString()
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
 * slug 가 일치하는 포스트를 마크다운 문자열로 가져옵니다
 */
function getPost(slug: string) {
  for (const markdownString of getAllPostsRawString()) {
    const ast = parseToAST(markdownString);
    const meta = getYamlMetaData(ast);
    if (meta?.slug === slug) {
      return markdownString;
    }
  }
  return null;
}

function getAllSlugs() {
  const postMetaDatas = getAllPostMetaData();
  return postMetaDatas.map((meta) => meta.slug);
}

const postService = {
  getAllPostMetaData,
  getPost,
  getAllSlugs,
};
export default postService;
