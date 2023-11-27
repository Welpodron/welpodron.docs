import { useMDXComponent } from 'next-contentlayer/hooks';

import { MdxPre } from './MdxPre';
import { MdxTable } from './MdxTable';

import { MdxTabs } from './tabs/MdxTabs';
import { MdxTabsControls } from './tabs/MdxTabsControls';
import { MdxTabsControl } from './tabs/MdxTabsControl';
import { MdxTabsItem } from './tabs/MdxTabsItem';

import { MdxShowcase } from './MdxShowcase';

import { MdxAlert } from './MdxAlert';
import { MdxMethod } from './MdxMethod';
import { MdxSandbox } from './MdxSandbox';

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
  Sandbox: MdxSandbox,
};

export const Mdx = ({ code }: { code: string }) => {
  const MDXContent = useMDXComponent(code);
  // @ts-ignore
  return <MDXContent components={components} />;
};
