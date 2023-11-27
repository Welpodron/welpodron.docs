import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 z-[300] w-full h-full grid place-content-center place-items-center bg-slate-200 dark:bg-slate-800 text-indigo-700`}
    >
      <h1 className="text-8xl font-bold">404</h1>
      <Link
        href="/"
        scroll={false}
        className="inline-flex text-white bg-indigo-700 font-medium rounded text-sm px-5 py-2.5 text-center my-4"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
