import { allPosts } from "contentlayer/generated";
import { getBreadcrumbsTree, getTocTree, getNavTree } from "@/utils/utils";
import { Mdx } from "@/components/mdx/Mdx";
import { Shell } from "@/components/shell/Shell";

export const generateStaticParams = async (a: any) => {
  return allPosts.map((post) => {
    const path = post._raw.flattenedPath.split("/");

    return {
      env: path[1],
      group: path[2],
      slug: path[3],
    };
  });
};

export const generateMetadata = async ({
  params,
}: {
  params: { env: string; group: string; slug: string };
}) => {
  const post = allPosts.find((post) => {
    const path = post._raw.flattenedPath.split("/");

    if (
      path[1] === params.env &&
      path[2] === params.group &&
      path[3] === params.slug
    ) {
      return true;
    }
  });

  if (post) {
    return {
      title: post.title,
    };
  }
};

const PostLayout = async ({
  params,
}: {
  params: { env: string; group: string; slug: string };
}) => {
  const currentPost = allPosts.find((post) => {
    const path = post._raw.flattenedPath.split("/");

    if (
      path[1] === params.env &&
      path[2] === params.group &&
      path[3] === params.slug
    ) {
      return true;
    }
  });

  if (!currentPost) {
    return <p>Not found</p>;
  }

  const tocTree = await getTocTree(currentPost.body.raw);
  const navTree = getNavTree(allPosts, currentPost);
  const breadcrumbsTree = getBreadcrumbsTree(allPosts, currentPost);

  return (
    <Shell {...{ tocTree, navTree, breadcrumbsTree }}>
      <h1>{currentPost.title}</h1>
      <Mdx code={currentPost.body.code} />
    </Shell>
  );
};

export default PostLayout;
