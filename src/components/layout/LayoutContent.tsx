import { NavTreeBranchType } from '@/utils/utils';
import { LayoutNav } from './LayoutNav';
import {
  IconBrandDiscord,
  IconBrandTelegram,
  IconBrandVk,
} from '@tabler/icons-react';
import { Alert } from '@/components/alert/Alert';

export type LayoutContentPropsType = {
  navTree: NavTreeBranchType[];
};

export const LayoutContent = ({
  navTree,
  ...props
}: LayoutContentPropsType) => {
  //TODO: Добавить поиск и фильтрацию по решениям и проектам

  return (
    <main
      {...props}
      className="p-4 relative min-h-[100vh] container max-w-7xl mx-auto"
    >
      <div className="space-y-20 py-20 pt-10">
        <div className="space-y-10">
          <h1 className="font-extrabold py-5 text-4xl sm:text-5xl lg:text-6xl tracking-tight break-words sm:break-normal">
            Документация для всякого разного
          </h1>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
            Данная документация создана к проектам, модулям, компонентам и
            прочим штукам в &quot;экосистеме&quot; welpodron. На текущий момент
            документация находится в разработке: содержимое самой документации
            может кардинально меняться, программный код некоторых репозиториев
            может быть полностью переписан, пояснения к некоторым вещам, как они
            работают и как их использовать, возможно, что не появятся никогда c:
            поэтому по всем вопросам и предложениям лучше писать напрямую
            используя данные сервисы:
          </p>
          <ul className="flex space-x-4">
            <li>
              <a
                target="_blank"
                href="https://vk.com/welpodron"
                className="rounded p-2 inline-block bg-slate-200 dark:bg-slate-800"
              >
                <IconBrandVk strokeWidth={1.7} />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://t.me/welpodron"
                className="rounded p-2 inline-block bg-slate-200 dark:bg-slate-800"
              >
                <IconBrandTelegram strokeWidth={1.7} />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://discordapp.com/users/468090146894512128"
                className="rounded p-2 inline-block bg-slate-200 dark:bg-slate-800"
              >
                <IconBrandDiscord strokeWidth={1.7} />
              </a>
            </li>
          </ul>
          <Alert type="warning">
            <p>
              Для проектов написанных на <b>Java</b> отлично подойдут решения{' '}
              <a
                target="_blank"
                className="underline font-bold"
                href="https://github.com/SalipA"
              >
                SalipA
              </a>
            </p>
          </Alert>
        </div>

        <LayoutNav tree={navTree} />
      </div>
    </main>
  );
};

LayoutContent.displayName = 'Layout.Content';
