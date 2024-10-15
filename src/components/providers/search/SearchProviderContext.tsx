import { createContext } from "react";

export type SearchSuggestionType = {
  title: string;
  desc?: string;
  url: string;
  tags?: string[];
};

export type SearchProviderContextType = {
  findSuggestions: (query: string, exact?: boolean) => SearchSuggestionType[]
};

export const SearchProviderContext = createContext<SearchProviderContextType>({
  findSuggestions: () => []
});

SearchProviderContext.displayName = "SearchProvider.Context";
