import { IconArrowUp } from "@tabler/icons-react";
import { useCallback, useEffect, useRef } from "react";
import { ComponentGeneralPropsType } from "@/components/component/Component";

export type ButtonTopPropsType = {} & ComponentGeneralPropsType;

export const ButtonTop = ({
  style: styleOutside,
  className: classNameOutside,
  ...props
}: ButtonTopPropsType) => {
  const refInside = useRef<HTMLButtonElement>(null);

  const handleWindowScroll = useCallback(() => {
    if (!refInside || !refInside.current) {
      return;
    }

    if (!window) {
      return;
    }

    if (window.scrollY > 300) {
      refInside.current.style.visibility = "visible";
    } else {
      refInside.current.style.visibility = "hidden";
    }
  }, [refInside]);

  const handleButtonClick = useCallback(() => {
    if (!window) {
      return;
    }

    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    if (!refInside || !refInside.current) {
      return;
    }

    if (!window) {
      return;
    }

    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [refInside]);

  return (
    <button
      {...props}
      style={{
        ...styleOutside,
      }}
      onClick={handleButtonClick}
      ref={refInside}
      className={`rounded p-2 invisible bg-slate-200 dark:bg-slate-800 sticky right-0 bottom-4 justify-self-end z-20`}
    >
      <IconArrowUp />
      <span className="sr-only">Пролистать в начало страницы</span>
    </button>
  );
};

ButtonTop.displayName = "Button.Top";
