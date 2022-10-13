import { readFileSync } from "fs";
import { PostMetaData } from "../../../models/posts.model";
import { readDirSyncAtLocal, readFileSyncAtLocal } from "../__utils/file.utils";
import { getYamlMetaData, parseToAST } from "../__utils/remark.utils";

const POST_DIRECTORY = "__posts";

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
