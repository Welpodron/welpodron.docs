"use client";

import { TabsControl } from "@/components/tabs/TabsControl";
import { TabsContext } from "@/components/tabs/TabsContext";

import { useContext } from "react";
import { IconBrandHtml5, IconBrandJavascript } from "@tabler/icons-react";

export type _MdxTabsControlPropsType = {
  children: React.ReactNode;
  itemId: string;
};

export const _MdxTabsControl = ({
  children,
  itemId,
  ...props
}: _MdxTabsControlPropsType) => {
  const { activeItemId } = useContext(TabsContext);

  return (
    <TabsControl
      className={`font-medium p-3 ${
        activeItemId === itemId ? "bg-indigo-500 text-white" : "bg-transparent"
      } inline-flex items-center leading-none`}
      itemId={itemId}
      {...props}
    >
      {itemId === "HTML" && <IconBrandHtml5 className="shrink-0 mr-2" />}
      {itemId === "JS" && <IconBrandJavascript className="shrink-0 mr-2" />}
      {children}
    </TabsControl>
  );
};
