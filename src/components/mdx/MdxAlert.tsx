import { Alert } from '@/components/alert/Alert';

export type MdxAlertPropsType = {
  children: React.ReactNode;
};

export const MdxAlert = ({ children, ...props }: MdxAlertPropsType) => {
  return <Alert {...props}>{children}</Alert>;
};
