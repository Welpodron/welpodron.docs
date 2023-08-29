import { Showcase } from "@/components/showcase/Showcase";

export type MdxShowcasePropsType = {
  children: React.ReactNode;
};

export const MdxShowcase = ({ children, ...props }: MdxShowcasePropsType) => {
  return <Showcase {...props}>{children}</Showcase>;
};
