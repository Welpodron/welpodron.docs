import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

import { createCssVariablesTheme } from "shiki/core";

const myTheme = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
});

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
      [
        rehypePrettyCode,
        {
          theme: myTheme,
        },
      ],
      [rehypeSlug],
      [rehypeAutolinkHeadings],
    ],
  },
});
