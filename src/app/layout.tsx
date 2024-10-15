import "../styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["cyrillic"] });

import { ThemeProvider } from "@/components/providers/theme/ThemeProvider";
import { ModalsProvider } from "@/components/providers/modals/ModalsProvider";
import { Jumper } from "@/components/jumper/Jumper";
import { Initializer } from "@/components/initializer/Initializer";
import { allPosts } from "contentlayer/generated";
import { SearchProvider } from "@/components/providers/search/SearchProvider";

export const metadata: Metadata = {
  title: "Документация welpodron.docs",
  description: "Документация welpodron.docs",
  keywords: "javascript, react, nextjs, typescript, css, html, php, bitrix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ru">
      <Jumper />
      <body className={inter.className}>
        <SearchProvider
          suggestions={allPosts
            .filter((post) => post.depth > 2)
            .map((post) => ({
              desc: post.description
                ? post.description.trim().toLowerCase()
                : undefined,
              title: post.title.trim().toLowerCase(),
              url: post.url,
              tags: post.url.split("/", 3).slice(-1),
            }))}
        >
          <ThemeProvider>
            <ModalsProvider>
              <Initializer>{children}</Initializer>
            </ModalsProvider>
          </ThemeProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
