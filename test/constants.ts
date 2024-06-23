export const PLANETS_URL = 'https://swapi.dev/api/planets/';
export const PLANET_URL = 'https://swapi.dev/api/planets/1/';
export const CHARACTER_URL = 'https://swapi.dev/api/people/1/';
export const CHARACTERS_URL = 'https://swapi.dev/api/people/';
export const CHARACTERS_URL_PAGE_2 = 'https://swapi.dev/api/people/?page=2';

export const PLANET_DATA = {
  data: { name: 'Tatooine', residents: [] },
};

export const PLANETS_DATA = {
  data: {
    results: [
      { name: 'Tatooine', residents: [] },
      {
        name: 'Naboo',
        residents: [CHARACTER_URL],
      },
    ],
  },
};

export const CHARACTERS_DATA = {
  data: {
    results: [{ name: 'Luke Skywalker' }, { name: 'R2-D2' }],
    next: CHARACTERS_URL_PAGE_2,
  },
};

export const CHARACTER_DATA = {
  data: { name: 'Clara' },
};
