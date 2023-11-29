import { polymorphize } from '@/utils/polymorphize/polymorphize';
import { ComponentGeneralPropsType } from '@/components/component/Component';
import { classnamify } from '@/utils/classnamify/classnamify';
import { forwardRef, memo } from 'react';
import { IconAlertOctagon } from '@tabler/icons-react';

export type AlertPropsType = {
  /** default children */
  children: React.ReactNode;
  type?: 'warning' | 'danger';
  icon?: React.ReactNode;
  title?: React.ReactNode;
  useHeader?: boolean;
} & ComponentGeneralPropsType;

const _Alert = memo(
  forwardRef<
    HTMLDivElement,
    AlertPropsType & {
      as?: React.ElementType;
    }
  >(
    (
      {
        type = 'danger',
        title = 'Внимание!',
        useHeader = true,
        children,
        icon,
        as,
        style: styleOutside,
        className: classNameOutside,
        ...props
      },
      refForwarded
    ) => {
      const Element = as || 'div';

      return (
        <Element
          {...props}
          style={{
            ...styleOutside,
          }}
          ref={refForwarded}
          className={classnamify(
            `not-prose relative rounded overflow-hidden before:left-0 before:top-0 before:w-1 before:absolute before:h-full pl-1 dark:bg-slate-900`,
            type === 'danger'
              ? `dark:text-red-500 bg-red-400/20  before:bg-red-500`
              : `dark:text-yellow-500 bg-yellow-400/20  before:bg-yellow-500`,
            classNameOutside
          )}
        >
          {useHeader && (
            <p className="p-4 font-medium flex items-center justify-between pb-0">
              <span
                className={classnamify(
                  `inline-flex items-center rounded p-2 `,
                  type === 'danger'
                    ? `text-white bg-red-500`
                    : `bg-yellow-500 text-slate-900`
                )}
              >
                {icon || <IconAlertOctagon className="shrink-0 mr-2" />}
                <span>{title}</span>
              </span>
            </p>
          )}
          <div className="p-4">{children}</div>
        </Element>
      );
    }
  )
);

_Alert.displayName = 'Alert';

export const Alert = polymorphize<'div', AlertPropsType>(_Alert);
