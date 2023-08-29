import { useEffect, useId, useState } from "react";

import { CollapseContext } from "./CollapseContext";
import { CollapseControl } from "./CollapseControl";
import { CollapseContent } from "./CollapseContent";

export type CollapsePropsType = {
  children: React.ReactNode;
  /**
   * Активен ли элемент сейчас (полный контроль над состоянием извне)
   */
  isActive?: boolean;
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
  isActive: isActiveOutside,
  isActiveDefault = false,
  onChange = () => {},
  ...props
}: CollapsePropsType) => {
  const _id = useId();

  const [isActiveInside, setIsActiveInside] = useState(isActiveDefault);

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
        setIsActive:
          isActiveOutside != null
            ? () => setIsActiveInside(isActiveOutside)
            : setIsActiveInside,
      }}
    >
      {children}
    </CollapseContext.Provider>
  );
};

Collapse.displayName = "Collapse";

Collapse.Control = CollapseControl;
Collapse.Content = CollapseContent;
