import { IconSearch, IconX } from "@tabler/icons-react";
import {
  SearchProviderContext,
  SearchSuggestionType,
} from "@/components/providers/search/SearchProviderContext";
import { RefObject, useCallback, useContext, useEffect, useState } from "react";
import { ModalsProviderContext } from "@/components/providers/modals/ModalsProviderContext";

import { useRouter, usePathname } from "next/navigation";
import { SEARCH_MODAL_ID } from "@/constants/constants";

export type SearchPropsType = {
  searchInputRef: RefObject<HTMLInputElement>;
};

export const Search = ({searchInputRef}: SearchPropsType) => {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestionType[]>([]);
  const { findSuggestions } = useContext(SearchProviderContext);
  const { closeModal } = useContext(ModalsProviderContext);

  const trimmedQuery = query.toLowerCase().trim();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.currentTarget.value);
    },
    []
  );

  const handleLinkClick = useCallback(
    (slug: string) => (event: React.MouseEvent) => {
      event.preventDefault();

      closeModal(SEARCH_MODAL_ID);

      if (slug !== pathname) {
        router.push(slug, { scroll: false });
      }
    },
    [pathname]
  );

  useEffect(() => {
    if (!trimmedQuery) {
      setSuggestions([]);
      return;
    }

    setSuggestions(findSuggestions(trimmedQuery));
  }, [trimmedQuery]);

  return (
    <div className="flex flex-col w-full">
      <div className="relative border p-4 rounded-t-xl bg-white border-slate-200 not-prose dark:border-slate-800 flex w-full items-center leading-none dark:bg-slate-800">
        <IconSearch
          width={20}
          height={20}
          className="shrink-0 text-slate-500 dark:text-slate-100 z-[2] relative"
        />
        <input
          placeholder="Поиск по сайту"
          className="w-full h-full absolute left-0 top-0 rounded-t-xl z-[1] pl-12 pr-20 appearance-none dark:bg-slate-800"
          type="search"
          value={query}
          onChange={handleChange}
          ref={searchInputRef}
        />
        <button
          className="rounded ml-auto p-2 ml-4 bg-slate-200 dark:bg-slate-800 z-[2]"
          type="button"
          onClick={() => closeModal(SEARCH_MODAL_ID)}
        >
          <IconX />
        </button>
      </div>
      <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-b-xl grid w-full overflow-y-auto h-full md:h-[min(55vh,_500px)]">
        {suggestions.length > 0 ? (
          <ul className="space-y-4 w-full">
            {suggestions.map(({ url, title, desc, tags }, index) => (
              <li key={index}>
                <a
                  className="bg-white p-4 md:py-5 w-full rounded-xl block dark:bg-slate-900"
                  href={url}
                  onClick={handleLinkClick(url)}
                >
                  {tags && tags.length > 0 && (
                    <span className="flex space-x-2 mb-2">
                      {tags.map((tag, index) => (
                        <span className="p-1 text-xs inline-block rounded bg-indigo-500 dark:bg-indigo-700 text-white" key={index}>{tag}</span>
                      ))}
                    </span>
                  )}
                  <span
                    className="font-bold block"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                  {desc && (
                    <span
                      className="text-xs block mt-2"
                      dangerouslySetInnerHTML={{ __html: desc }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-6 text-center w-full self-center">
            По текущему запросу ничего не найдено :c
          </p>
        )}
      </div>
    </div>
  );
};

Search.displayName = "Search";
