import { Alert, AlertPropsType } from '@/components/alert/Alert';

export type MdxAlertPropsType = {} & AlertPropsType;

export const MdxAlert = ({ children, ...props }: MdxAlertPropsType) => {
  return <Alert {...props}>{children}</Alert>;
};
