import { createContext, SetStateAction, Dispatch } from 'react';

export type CollapseContextType = {
  _id: string;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};

export const CollapseContext = createContext<CollapseContextType>({
  _id: '',
  isActive: false,
  setIsActive: () => {},
});

CollapseContext.displayName = 'Collapse.Context';
