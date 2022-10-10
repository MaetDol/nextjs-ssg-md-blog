import { GetStaticPropsContext, NextPage } from 'next';
import Link from 'next/link';
import { useMemo } from 'react';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkHtml from 'remark-html';
import postService from './api/__services/post.service';

interface Props {
  markdownString: string;
}

const Post: NextPage<Props> = ({ markdownString }) => {
  const renderedPost = useMemo(() => {
    const ast = remark().use(remarkFrontmatter).parse(markdownString);
    return remark().use(remarkHtml).stringify(ast);
  }, [markdownString]);

  return (
    <div>
      <Link href="/">
        <a>&lt; 포스트 목록으로 돌아가기</a>
      </Link>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: renderedPost }} />
    </div>
  );
};

export default Post;

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context.params?.slug?.toString() || '';
  const markdownString = postService.getPost(slug);

  return {
    props: {
      markdownString,
    },
  };
}

export async function getStaticPaths() {
  const slugs = postService.getAllSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}
