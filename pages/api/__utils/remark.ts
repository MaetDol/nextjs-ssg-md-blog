import { Content, Root } from 'mdast';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import YAML from 'yaml';
import { PostMetaData } from '../../../models/posts.model';

/**
 * 문자열을 AST로 파싱합니다
 */
export function parseToAST(content: string) {
  return remark().use(remarkFrontmatter).parse(content);
}

type ContentWithChildren = Content & { children?: Content[] };

/**
 * remark 로 얻은 AST 를 순회하며, 콜백함수를 실행합니다
 * 콜백 함수에서 true가 나올경우, 순회를 중단합니다
 */
export function iterateTree(
  tree: ContentWithChildren | Root,
  callback: (node: ContentWithChildren | Root) => boolean | void
) {
  const shouldStopRecursive = callback(tree);
  if (shouldStopRecursive) return true;

  for (const node of tree.children || []) {
    const shouldStopIterate = iterateTree(node, callback);
    if (shouldStopIterate) return true;
  }
}

/**
 *  AST 에서 yaml 을 파싱해 가져옵니다
 */
export function getYamlMetaData(ast: Root): PostMetaData | null {
  let metaData: PostMetaData | null = null;
  iterateTree(ast, (node) => {
    if (node.type !== 'yaml') return;

    metaData = YAML.parse(node.value);
    return true;
  });

  return metaData;
}
