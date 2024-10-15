import { useMDXComponent } from "next-contentlayer2/hooks";

import { MdxPre } from "./MdxPre";
import { MdxTable } from "./MdxTable";

import { MdxTabs } from "./tabs/MdxTabs";
import { MdxTabsControls } from "./tabs/MdxTabsControls";
import { MdxTabsControl } from "./tabs/MdxTabsControl";
import { MdxTabsItem } from "./tabs/MdxTabsItem";

import { MdxShowcase } from "./MdxShowcase";

import { MdxAlert } from "./MdxAlert";
import { MdxMethod } from "./MdxMethod";

import { CollapsePreview } from "./previews/CollapsePreview";
import { TabsPreview } from "./previews/TabsPreview";
import { AccordionPreview } from "./previews/AccordionPreview";
import { ModalPreview } from "./previews/ModalPreview";
import { CarouselPreview } from "./previews/CarouselPreview";

const components = {
  pre: MdxPre,
  table: MdxTable,
  Method: MdxMethod,
  Alert: MdxAlert,
  Showcase: MdxShowcase,
  Tabs: MdxTabs,
  TabsControls: MdxTabsControls,
  TabsControl: MdxTabsControl,
  TabsItem: MdxTabsItem,
  CollapsePreview,
  TabsPreview,
  AccordionPreview,
  ModalPreview,
  CarouselPreview,
};

export const Mdx = ({ code }: { code: string }) => {
  const MDXContent = useMDXComponent(code);
  // @ts-ignore
  return <MDXContent components={components} />;
};
