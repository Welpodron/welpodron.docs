import { IconLoader2 } from '@tabler/icons-react';

export default function Loading() {
  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 z-[300] w-full h-full grid place-content-center place-items-center bg-slate-200 dark:bg-slate-800 text-indigo-700`}
    >
      <IconLoader2
        width={48}
        height={48}
        className="animate-spin pointer-events-none"
      />
    </div>
  );
}
