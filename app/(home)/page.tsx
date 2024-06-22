'use client';

import { useCharactersData } from '@/utils/hooks/useCharactersData';

import { useState } from 'react';
import Filter from '../components/filter/Filter';
import CharacterList from '../components/characterList/CharacterList';
import { TPlanet, usePlanetsData } from '@/utils/hooks/usePlanetsData';
import Loading from '../components/characterList/CharacterListLoading';
import Button from '../components/button/Button';

export default function Home() {
  const [selectedPlanet, setSelectedPlanet] = useState<TPlanet>();

  const { data: planetsData, isPending: isPlanetsPending } = usePlanetsData();

  const {
    allCharactersData,
    filteredCharactersData,
    isPending,
    isError,
    isEmpty,
    error,
    fetchNextPage,
    hasNextPage,
    pageTitle,
    showFiltered,
    showCharacters,
  } = useCharactersData(selectedPlanet);

  function handleFilter(value: string) {
    if (value === 'all') {
      setSelectedPlanet(undefined);
    }
    const index = Number(value);
    if (planetsData?.[index]) {
      setSelectedPlanet(planetsData[index]);
    }
  }

  return (
    <main>
      <Filter options={planetsData || []} filter={handleFilter} />

      <section className="md:p-13 p-6.5">
        <h2 className="md:text-4xl text-3.5xl font-light pb-10">{pageTitle}</h2>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-7">
          {isPending && <Loading />}
          {isEmpty && <h2>No characters were found.</h2>}
          {isError && <h2>{error?.message}</h2>}
          {showCharacters && renderCharacterList()}
        </div>
        <div className="text-center">
          <Button
            onClick={() => fetchNextPage()}
            isLoading={isPending}
            disabled={!hasNextPage || isPending || isError || isEmpty}
            className="md:w-1/3 w-2/3 mt-7"
          >
            Load More
          </Button>
        </div>
      </section>
    </main>
  );

  function renderCharacterList() {
    return showFiltered ? (
      <CharacterList characters={filteredCharactersData || []} />
    ) : (
      allCharactersData?.pages.map((page, i) => {
        return <CharacterList key={i} characters={page?.data?.results} />;
      })
    );
  }
}
