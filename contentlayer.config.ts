import { defineDocumentType, makeSource } from "contentlayer/source-files";

import remarkGfm from "remark-gfm";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { visit } from "unist-util-visit";
import { UnistNode } from "node_modules/unist-util-visit/lib";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    isDirectory: {
      type: "boolean",
      default: false,
    },
    iconComponent: {
      type: "string",
    },
    showcaseComponent: {
      type: "string",
    },
    pagination_prev: {
      type: "string",
    },
    pagination_next: {
      type: "string",
    },
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/${doc._raw.flattenedPath}` },
    parent: {
      type: "string",
      resolve: (doc) =>
        doc._raw.flattenedPath.split("/").slice(0, -1).join("/"),
    },
    depth: {
      type: "number",
      resolve: (doc) => doc._raw.flattenedPath.split("/").length - 1,
    },
  },
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [[remarkGfm]],
    rehypePlugins: [
      () => (root: UnistNode) => {
        visit(
          root,
          "element",
          (node: {
            type: string;
            tagName: string;
            data: Record<string, any>;
            children: {
              type: string;
              tagName: string;
              children: { value: string }[];
              data: Record<string, any>;
              properties: Record<string, any>;
            }[];
          }) => {
            if (node.type !== "element" || node.tagName !== "pre") {
              return;
            }

            const [codeElement] = node.children;

            if (
              codeElement.type !== "element" ||
              codeElement.tagName !== "code"
            ) {
              return;
            }

            let isPreview = false;

            if (codeElement.data?.meta?.includes("PREVIEW")) {
              isPreview = true;
            }

            if (node.data) {
              node.data.rawCode = codeElement.children?.[0].value;
              node.data.isPreview = isPreview;
            } else {
              node.data = {
                rawCode: codeElement.children?.[0].value,
                isPreview: isPreview,
              };
            }
          }
        );
      },
      [
        rehypePrettyCode,
        {
          theme: "css-variables",
        },
      ],
      () => (tree: UnistNode) => {
        visit(
          tree,
          "element",
          (node: {
            type: string;
            tagName: string;
            data: Record<string, any>;
            properties: Record<string, any>;
            children: {
              type: string;
              tagName: string;
              children: { value: string }[];
              data: Record<string, any>;
              properties: Record<string, any>;
            }[];
          }) => {
            if (node.type !== "element" || node.tagName !== "div") {
              return;
            }

            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return;
            }

            for (const child of node.children) {
              if (child.tagName === "pre") {
                if (!child.properties) {
                  child.properties = {};
                }

                child.properties.rawCode = node.data.rawCode;
                child.properties.isPreview = node.data.isPreview;
              }
            }
          }
        );
      },
      [rehypeSlug, {}],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
  },
});
