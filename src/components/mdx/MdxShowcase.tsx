import { Showcase, ShowcasePropsType } from '@/components/showcase/Showcase';

export type MdxShowcasePropsType = {} & ShowcasePropsType;

export const MdxShowcase = ({ ...props }: MdxShowcasePropsType) => {
  return <Showcase {...props} />;
};
