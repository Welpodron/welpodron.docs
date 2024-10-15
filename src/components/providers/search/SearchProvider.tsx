"use client";

import { useCallback, useMemo } from "react";

import {
  SearchProviderContext,
  SearchSuggestionType,
} from "./SearchProviderContext";

export type SearchProviderPropsType = {
  children: React.ReactNode;
  suggestions: SearchSuggestionType[];
};

const MAX_SEARCH_SUGGESTIONS = 8;

export const SearchProvider = ({
  children,
  suggestions,
}: SearchProviderPropsType) => {
  const _suggestions = useMemo(() => suggestions, [suggestions]);

  const findSuggestions = useCallback(
    (query: string, exact?: boolean) => {
      if (!query) {
        return [];
      }

      if (!exact) {
        const results: SearchSuggestionType[] = [];

        for (let j = 0; j < _suggestions.length; j++) {
          if (results.length >= MAX_SEARCH_SUGGESTIONS) {
            break;
          }
          const {
            title: originalTitle,
            url,
            desc: originalDesc,
            tags,
          } = _suggestions[j];

          let modifiedDesc = "";
          let modifiedTitle = "";

          const titleStartingIndex = originalTitle.indexOf(query);

          if (titleStartingIndex !== -1) {
            for (let i = 0; i < titleStartingIndex; i++) {
              modifiedTitle += originalTitle[i];
            }

            modifiedTitle += "<b data-w-linted>";

            let symbolCounter = 1;
            let queryEndIndex = titleStartingIndex;

            for (let i = titleStartingIndex; i < originalTitle.length; i++) {
              modifiedTitle += originalTitle[i];

              if (symbolCounter >= query.length) {
                queryEndIndex = i + 1;
                break;
              }

              symbolCounter++;
            }

            modifiedTitle += "</b>";

            for (let i = queryEndIndex; i < originalTitle.length; i++) {
              modifiedTitle += originalTitle[i];
            }
          }

          if (originalDesc) {
            const descStartingIndex = originalDesc.indexOf(query);
            if (descStartingIndex !== -1) {
              for (let i = 0; i < descStartingIndex; i++) {
                modifiedDesc += originalDesc[i];
              }

              modifiedDesc += "<b data-w-linted>";

              let symbolCounter = 1;
              let queryEndIndex = descStartingIndex;

              for (let i = descStartingIndex; i < originalDesc.length; i++) {
                modifiedDesc += originalDesc[i];

                if (symbolCounter >= query.length) {
                  queryEndIndex = i + 1;
                  break;
                }

                symbolCounter++;
              }

              modifiedDesc += "</b>";

              for (let i = queryEndIndex; i < originalDesc.length; i++) {
                modifiedDesc += originalDesc[i];
              }
            }
          }

          if (modifiedDesc || modifiedTitle) {
            results.push({
              title: modifiedTitle ? modifiedTitle : originalTitle,
              desc: modifiedDesc ? modifiedDesc : originalDesc,
              url,
              tags,
            });
          }
        }

        return results;
      }

      return _suggestions
        .filter(
          (suggestion) =>
            suggestion.title === query || suggestion.desc === query
        )
        .slice(0, MAX_SEARCH_SUGGESTIONS);
    },
    [_suggestions]
  );

  return (
    <SearchProviderContext.Provider value={{ findSuggestions }}>
      {children}
    </SearchProviderContext.Provider>
  );
};

SearchProvider.displayName = "SearchProvider";
