import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkHtml from "remark-html";
import useSWR from "swr";
import { textRequest } from "../api/fetcher";
import { FallbackProps, withSwrFallback } from "../components/swr-fallback.hoc";
import postService from "./api/__services/post.service";

const getPostUrl = (slug: string) => `/api/posts/${slug}`;

const Post: NextPage = () => {
  const { query } = useRouter();
  const { data: markdownString, error } = useSWR<string>(
    getPostUrl(query.slug?.toString() || "NAN"),
    textRequest
  );

  const renderedPost = useMemo(() => {
    if (!markdownString) return "";
    if (error) {
      console.error(error);
      return "";
    }

    const ast = remark().use(remarkFrontmatter).parse(markdownString);
    return remark().use(remarkHtml).stringify(ast);
  }, [markdownString, error]);

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

export default withSwrFallback(Post);

export async function getStaticPaths() {
  const slugs = postService.getAllSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

type Fallback = {
  [key: string]: string;
};

export const getStaticProps: GetStaticProps<FallbackProps<Fallback>> = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug?.toString() || "";
  const markdownString = postService.getPost(slug) || "";

  return {
    props: {
      fallback: {
        [getPostUrl(slug)]: markdownString,
      },
    },
  };
};
