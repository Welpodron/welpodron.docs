'use client';

import { IconCopy, IconCheck } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { ComponentGeneralPropsType } from '@/components/component/Component';
import { classnamify } from '@/utils/classnamify/classnamify';

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

  const handleButtonClick = useCallback(() => {
    (async () => {
      const type = 'text/plain';
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];

      try {
        await navigator.clipboard.write(data);
      } catch (_) {
        document.execCommand('copy', false, text);
      }

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 500);
    })();
  }, [text]);

  return (
    <span className={isCopied ? 'cursor-not-allowed' : 'pointer'}>
      <button
        {...props}
        style={{
          ...styleButtonOutside,
        }}
        className={classnamify(
          'rounded p-2',
          isCopied ? 'pointer-events-none' : 'pointer-events-auto',
          classNameButtonOutside
        )}
        disabled={isCopied}
        onClick={handleButtonClick}
      >
        {isCopied ? <IconCheck className="text-green-500" /> : <IconCopy />}
        <span className="sr-only">
          {isCopied ? 'Код скопирован' : 'Скопировать код'}
        </span>
      </button>
    </span>
  );
};

ButtonCopy.displayName = 'Button.Copy';
