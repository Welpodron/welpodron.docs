import { createContext, SetStateAction, Dispatch } from 'react';

export type TooltipContextType = {
  //   _id: string;
  isActive: boolean;
};

export const TooltipContext = createContext<TooltipContextType>({
  //   _id: '',
  isActive: false,
});

TooltipContext.displayName = 'Tooltip.Context';
