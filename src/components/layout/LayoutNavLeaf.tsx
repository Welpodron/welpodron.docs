import { IconChevronUp } from "@tabler/icons-react";
import { Collapse } from "@/components/collapse/Collapse";
import Link from "next/link";
import { useState } from "react";
import { Tooltip } from "@/components/tooltip/Tooltip";

export type LayoutNavLeafPropsType = {
  title: string;
  seeds: {
    title: string;
    url: string;
  }[];
};

export const LayoutNavLeaf = ({ title, seeds }: LayoutNavLeafPropsType) => {
  const [isActive, setIsActive] = useState(true);

  const iconStyle = {
    transform: `rotate(${isActive ? "0" : "180deg"})`,
  };

  return (
    <div>
      <Collapse state={[isActive, setIsActive]}>
        <div className="flex py-10 justify-between items-center">
          <h3 className="text-base font-semibold">{title}</h3>
          <div className="justify-self-end relative">
            <Tooltip label={isActive ? "Скрыть" : "Показать"}>
              <Collapse.Control className="rounded p-2 bg-slate-200 dark:bg-slate-800 ">
                <IconChevronUp
                  data-collapse-control-icon=""
                  style={iconStyle}
                />
                <span className="sr-only">
                  {isActive ? "Скрыть" : "Показать"}
                </span>
              </Collapse.Control>
            </Tooltip>
          </div>
        </div>
        <Collapse.Content>
          {seeds.length > 0 && (
            <ul className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4 xl:gap-x-8">
              {seeds.map((seed) => (
                <li
                  key={seed.url}
                  className="rounded border border-slate-200 relative dark:border-slate-800 text-sm font-medium"
                >
                  <Link
                    scroll={false}
                    className="absolute block left-0 rounded top-0 w-full h-full"
                    href={seed.url}
                  >
                    <span className="sr-only">{seed.title}</span>
                  </Link>
                  <div className="min-h-[200px] flex items-center justify-center bg-slate-50 dark:bg-slate-900 showcase-preview">
                    <div className="w-[90%] h-[90%]">
                      <p className="text-sm font-bold text-center">
                        {seed.title}
                      </p>
                    </div>
                  </div>
                  <h4 className="p-4">{seed.title}</h4>
                </li>
              ))}
            </ul>
          )}
        </Collapse.Content>
      </Collapse>
    </div>
  );
};
