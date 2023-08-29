import { remark } from "remark";
import matter from "gray-matter";
import { visit } from "unist-util-visit";
import { UnistNode } from "node_modules/unist-util-visit/lib";
import { Post } from "contentlayer/generated";

export type NavTreeBranchType = {
  url: string;
  title: string;
  description?: string;
  parentUrl: string;
  isDirectory: boolean;
  isActive: boolean;
  depth: number;
  iconComponent?: string;
  showcaseComponent?: string;
  children: NavTreeBranchType[];
};

export type BreadcrumbsTreeBranchType = {
  url: string;
  title: string;
  parentUrl: string;
};

export type TocTreeBranchType = {
  url: string;
  title: string;
  depth: number;
  children: TocTreeBranchType[];
};

export const getTocTree = async (
  currentPostContent: string
): Promise<TocTreeBranchType[]> => {
  const matterResult = matter(currentPostContent);

  const processedContent = await remark()
    .use(() => (root: UnistNode, file: any) => {
      const tree: TocTreeBranchType[] = [];
      const treeMap: Record<string, any> = {};

      visit(
        root,
        "heading",
        (node: { depth: number; children: { value: string }[] }) => {
          //! В данном контексте такой трюк работает так как branch является ссылочным типом и по сути внутри tree и treeMap мы работаем с одним и тем же объектом
          const branch: TocTreeBranchType = {
            title: node.children[0].value,
            depth: node.depth,
            url: `#${node.children[0].value
              .toLowerCase()
              .replace(/\s+/g, "-")}`,
            children: [],
          };

          if (node.depth === 2) {
            tree.push(branch);
            treeMap[node.depth] = branch;
          } else {
            const parent = treeMap[node.depth - 1];
            if (parent) {
              parent.children.push(branch);
              treeMap[node.depth] = branch;
            }
          }
        }
      );

      file.data.tocTree = tree;
    })
    .process(matterResult.content);

  return processedContent.data.tocTree as TocTreeBranchType[];
};

export const getNavTree = (
  allPosts: Post[],
  currentPost?: Post
): NavTreeBranchType[] => {
  let tree: NavTreeBranchType[] = allPosts.map((post) => ({
    showcaseComponent: post.showcaseComponent,
    description: post.description,
    url: post._raw.flattenedPath,
    title: post.title,
    isDirectory: post.isDirectory,
    isActive: currentPost
      ? post._raw.flattenedPath === currentPost._raw.flattenedPath
      : false,
    parentUrl: post.parent,
    depth: post.depth,
    iconComponent: post.iconComponent,
    children: [],
  }));

  let depth = 4;

  while (depth > 1) {
    const currentTree = tree.filter((node) => node.depth === depth);

    tree = tree.filter((node) => node.depth !== depth);

    currentTree.forEach((node) => {
      const parent = tree.find((n) => n.url === node.parentUrl);

      if (parent) {
        parent.children.push(node);

        if (node.isActive) {
          parent.isActive = true;
        }
      }
    });

    depth--;
  }

  return tree;
};

export const getBreadcrumbsTree = (
  allPosts: Post[],
  currentPost: Post
): BreadcrumbsTreeBranchType[] => {
  let tree: BreadcrumbsTreeBranchType[] = allPosts.map((post) => ({
    url: post._raw.flattenedPath,
    title: post.title,
    parentUrl: post.parent,
  }));

  let currentUrl = currentPost._raw.flattenedPath;

  let currentLeaf = {
    url: currentPost._raw.flattenedPath,
    title: currentPost.title,
    parentUrl: currentPost.parent,
  };

  const branch = [currentLeaf];

  while (currentUrl !== "posts") {
    const parent = tree.find((n) => n.url === currentLeaf.parentUrl);

    if (!parent) {
      break;
    }

    branch.push(parent);

    currentUrl = parent.url;
    currentLeaf = parent;
  }

  branch.push({
    url: "",
    title: "Домашняя страница",
    parentUrl: "",
  });

  return branch.reverse();
};
