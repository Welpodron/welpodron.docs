"use client";

import { IconCopy, IconCheck } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { ComponentGeneralPropsType } from "@/components/component/Component";
import { useMergedClassName } from "@/hooks/useMergedClassName/useMergedClassName";

export type ButtonCopyPropsType = {
  text: string;
} & ComponentGeneralPropsType;

export const ButtonCopy = ({
  text,
  style: styleButtonOutside,
  className: classNameButtonOutside,
  ...props
}: ButtonCopyPropsType) => {
  const [isCopied, setIsCopied] = useState(false);

  const classNameSpanInside = isCopied ? "cursor-not-allowed" : "pointer";
  const classNameButtonInside =
    "rounded p-2 " + (isCopied ? "pointer-events-none" : "pointer-events-auto");

  const handleButtonClick = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();

      const type = "text/plain";
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];

      try {
        await navigator.clipboard.write(data);
      } catch (_) {
        document.execCommand("copy", false, text);
      }

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    },
    [setIsCopied]
  );

  return (
    <span className={classNameSpanInside}>
      <button
        {...props}
        style={{
          ...styleButtonOutside,
        }}
        className={useMergedClassName(
          classNameButtonInside,
          classNameButtonOutside
        )}
        disabled={isCopied}
        onClick={handleButtonClick}
      >
        {isCopied ? <IconCheck className="text-green-500" /> : <IconCopy />}
        <span className="sr-only">
          {isCopied ? "Код скопирован" : "Скопировать код"}
        </span>
      </button>
    </span>
  );
};

ButtonCopy.displayName = "Button.Copy";
