import { useMDXComponent } from "next-contentlayer/hooks";

import { MdxPre } from "./MdxPre";
import { MdxImage } from "./MdxImage";
import { MdxTable } from "./MdxTable";

import { MdxTabs } from "./tabs/MdxTabs";
import { MdxTabsControls } from "./tabs/MdxTabsControls";
import { MdxTabsControl } from "./tabs/MdxTabsControl";
import { MdxTabsItem } from "./tabs/MdxTabsItem";

import { MdxShowcase } from "./MdxShowcase";

const components = {
  img: MdxImage,
  pre: MdxPre,
  table: MdxTable,
  Showcase: MdxShowcase,
  Tabs: MdxTabs,
  TabsControls: MdxTabsControls,
  TabsControl: MdxTabsControl,
  TabsItem: MdxTabsItem,
};

export const Mdx = ({ code }: { code: string }) => {
  const MDXContent = useMDXComponent(code);
  // @ts-ignore
  return <MDXContent components={components} />;
};
