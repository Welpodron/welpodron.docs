"use client";

import { IconCopy, IconCheck } from "@tabler/icons-react";
import { RefObject, useCallback, useEffect, useState } from "react";
import { ComponentGeneralPropsType } from "@/components/component/Component";
import { classnamify } from "@/utils/classnamify/classnamify";
import { useTooltip } from "@/hooks/useTooltip/useTooltip";

export type ButtonCopyPropsType = {
  preElementRef: RefObject<HTMLPreElement>;
} & ComponentGeneralPropsType;

export const ButtonCopy = ({
  style: styleButtonOutside,
  className: classNameButtonOutside,
  preElementRef,
  ...props
}: ButtonCopyPropsType) => {
  const [isCopied, setIsCopied] = useState(false);

  const { refs, update } = useTooltip<HTMLButtonElement, HTMLSpanElement>();

  const handleButtonClick = useCallback(() => {
    (async () => {
      if (!preElementRef.current) {
        return;
      }

      const text = preElementRef.current.textContent;

      if (!text) {
        return;
      }

      const type = "text/plain";
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];

      try {
        await navigator.clipboard.write(data);

        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 800);
      } catch (_) {
        // show error 
      }
    })();
  }, []);

  useEffect(() => {
    update();
  }, [update, isCopied]);

  return (
    <span
      className={classnamify(
        "relative",
        isCopied ? "cursor-default" : "pointer"
      )}
    >
      <button
        {...props}
        style={{
          ...styleButtonOutside,
        }}
        className={classnamify("rounded p-2", classNameButtonOutside)}
        disabled={isCopied}
        ref={refs.anchorRef}
        type="button"
        onClick={handleButtonClick}
      >
        {isCopied ? <IconCheck className="text-green-500" /> : <IconCopy />}
        <span className="sr-only">
          {isCopied ? "Код скопирован" : "Скопировать код"}
        </span>
      </button>
      <span
        ref={refs.contentRef}
        className="bg-[#101D41] z-[200] hidden rounded text-white p-2 text-xs absolute left-0 pointer-events-none top-0 w-max max-w-[200px] line-clamp-2"
      >
        {isCopied ? "Код скопирован" : "Скопировать код"}
      </span>
    </span>
  );
};

ButtonCopy.displayName = "Button.Copy";
