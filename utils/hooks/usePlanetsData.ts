import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type TPlanet = {
  name: string;
  next?: string;
  url?: string;
  residents?: string[];
};

export function usePlanetData({ homeworld }: { homeworld: string }) {
  return useQuery({
    queryKey: ['planet', homeworld],
    queryFn: () => getPlanet({ homeworld }),
  });
}

export function usePlanetsData() {
  return useQuery({
    queryKey: ['planets'],
    queryFn: () => getPlanets(),
  });
}

const getPlanet = async ({
  homeworld,
}: {
  homeworld: string;
}): Promise<TPlanet> => {
  const response = await axios.get(homeworld);
  return {
    name: response.data.name,
  };
};

const getPlanets = async (): Promise<TPlanet[]> => {
  const { data } = await axios.get('https://swapi.dev/api/planets/');
  let next = data?.next;
  let planets = data?.results || [];
  while (next) {
    const { data } = await axios.get(next);
    planets.push(...(data?.results || []));
    next = data?.next;
  }
  return planets;
};
