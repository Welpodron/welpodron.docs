"use client";

import { IconCopy, IconCheck, IconAlertOctagon } from "@tabler/icons-react";
import { RefObject, useCallback, useContext, useRef, useState } from "react";
import { ComponentGeneralPropsType } from "@/components/component/Component";
import { classnamify } from "@/utils/classnamify/classnamify";
import { Tooltip } from "@/components/tooltip/Tooltip";
import { NotificationsProviderContext } from "@/components/providers/notifications/NotificationsProviderContext";
import { uuid } from "@/utils/uuid/uuid";

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
  const [isError, setIsError] = useState(false);
  const errorTimer = useRef<number>();
  const copiedTimer = useRef<number>();

  const { openNotification, closeNotification } = useContext(
    NotificationsProviderContext
  );

  const handleButtonClick = useCallback(() => {
    clearTimeout(errorTimer.current);
    clearTimeout(copiedTimer.current);

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
        setIsError(false);

        copiedTimer.current = window.setTimeout(() => {
          setIsCopied(false);
        }, 800);
      } catch (_) {
        const id = uuid();

        openNotification({
          id,
          children: "Не удалось скопировать код",
          onClose: () => closeNotification(id),
        });

        setIsCopied(false);
        setIsError(true);

        errorTimer.current = window.setTimeout(() => {
          setIsError(false);
        }, 800);
      }
    })();
  }, [openNotification, closeNotification]);

  return (
    <span
      className={classnamify(
        "relative",
        isCopied ? "cursor-default" : "pointer"
      )}
    >
      <Tooltip
        placement="relative"
        label={
          isCopied
            ? "Код скопирован"
            : isError
            ? "Не удалось скопировать"
            : "Скопировать код"
        }
      >
        <button
          {...props}
          style={{
            ...styleButtonOutside,
          }}
          className={classnamify("rounded p-2", classNameButtonOutside)}
          disabled={isCopied || isError}
          type="button"
          onClick={handleButtonClick}
        >
          {isCopied ? (
            <IconCheck className="text-green-500" />
          ) : isError ? (
            <IconAlertOctagon className="text-red-500" />
          ) : (
            <IconCopy />
          )}
          <span className="sr-only">
            {isCopied
              ? "Код скопирован"
              : isError
              ? "Не удалось скопировать"
              : "Скопировать код"}
          </span>
        </button>
      </Tooltip>
    </span>
  );
};

ButtonCopy.displayName = "Button.Copy";
