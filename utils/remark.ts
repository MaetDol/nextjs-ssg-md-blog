import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkHtml from "remark-html";

/**
 * 마크다운 스트링을 받아서, HTML 로 파싱합니다
 */
export function parseMarkdown(md: string) {
  const ast = remark().use(remarkFrontmatter).parse(md);
  return remark().use(remarkHtml).stringify(ast);
}
