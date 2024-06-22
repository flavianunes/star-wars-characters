import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TPlanet } from './usePlanetsData';

export type TCharacter = {
  name: string;
  homeworld: string;
  height: number;
  mass: number;
  gender: 'female' | 'male' | 'n/a';
};

export type TPage = {
  data: {
    results: TCharacter[];
    next: string;
  };
  previousCursor?: number;
  nextCursor?: number;
};

export function useCharactersData(planet?: TPlanet) {
  const {
    data: allCharactersData,
    isPending: isCharactersPending,
    isError: isCharactersError,
    error: charactersError,
    hasNextPage: charactersHasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePaginatedCharactersData();

  const {
    data: filteredCharactersData,
    isPending: isFilteredPending,
    isError: isFilteredError,
    error: filteredError,
  } = useFilteredData(planet);

  const isPending =
    isCharactersPending || isFilteredPending || isFetchingNextPage;
  const isError = isCharactersError || isFilteredError;
  const isEmpty = !isPending && planet && !filteredCharactersData?.length;
  const error = isError && isCharactersError ? charactersError : filteredError;
  const pageTitle = planet ? planet.name : 'All Characters';
  const showCharacters = !isPending && !isError && !isEmpty;
  const showFiltered = !!planet && !!filteredCharactersData?.length;
  const hasNextPage = !showFiltered && charactersHasNextPage;

  return {
    allCharactersData,
    filteredCharactersData,
    showFiltered,
    showCharacters,
    isPending,
    isError,
    isEmpty,
    error,
    fetchNextPage,
    hasNextPage,
    pageTitle,
  };
}

export const useFilteredData = (planet?: TPlanet) => {
  return useQuery<TCharacter[], Error>({
    queryKey: ['filteredCharacters', planet],
    queryFn: () => getResidents(planet?.residents ?? []),
  });
};

export function usePaginatedCharactersData() {
  return useInfiniteQuery<TPage, Error>({
    queryKey: ['characters'],
    queryFn: ({ pageParam }) => getCharacters({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

const getCharacters = async ({
  pageParam = 1,
}: {
  pageParam: unknown;
}): Promise<TPage> => {
  const params = {
    page: pageParam,
  };

  const response = await axios.get('http://swapi.dev/api/people', { params });

  const nextPage = response.data.next ? <number>pageParam + 1 : undefined;

  return {
    data: response.data,
    nextCursor: nextPage,
  };
};

export const getCharacter = async (url: string): Promise<TCharacter> => {
  const { data } = await axios.get(url);
  return data;
};

export const getResidents = async (residents: string[]) => {
  const data = await Promise.all(residents.map((url) => getCharacter(url)));
  return data;
};
