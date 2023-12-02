'use client';

import { Dispatch, SetStateAction, useEffect, useId, useState } from 'react';

import { CollapseContext } from './CollapseContext';
import { CollapseControl } from './CollapseControl';
import { CollapseContent } from './CollapseContent';

import './Collapse.css';

export type CollapsePropsType = {
  children: React.ReactNode;
  /** Контроль извне */
  state?: [boolean, Dispatch<SetStateAction<boolean>>];
  /**
   * Опциональный аргумент, влияющий на начальное состояние (контроль над состоянием внутри компонента, а не извне)
   * */
  isActiveDefault?: boolean;
  /**
   * Срабатывает при изменении состояния
   */
  onChange?: (isActive: boolean) => void;
};

export const Collapse = ({
  children,
  state,
  isActiveDefault = false,
  onChange = () => {},
  ...props
}: CollapsePropsType) => {
  const _id = useId();

  const [isActiveInside, setIsActiveInside] = useState(isActiveDefault);
  const [isActiveOutside, setIsActiveOutside] = state ?? [];

  useEffect(() => {
    if (onChange) {
      onChange(isActiveInside);
    }
  }, [isActiveInside, onChange]);

  return (
    <CollapseContext.Provider
      value={{
        _id,
        isActive: isActiveOutside ?? isActiveInside,
        setIsActive: setIsActiveOutside ?? setIsActiveInside,
      }}
    >
      {children}
    </CollapseContext.Provider>
  );
};

Collapse.displayName = 'Collapse';

Collapse.Control = CollapseControl;
Collapse.Content = CollapseContent;
