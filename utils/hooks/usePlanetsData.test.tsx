import { renderHook, waitFor } from '@/test/utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePlanetData, usePlanetsData } from './usePlanetsData';
import axios from 'axios';
import { TestProviders } from '@/test/provider';
import {
  PLANET_DATA,
  PLANET_URL,
  PLANETS_DATA,
  PLANETS_URL,
} from '@/test/constants';

vi.mock('axios');

describe('usePlanetsData', () => {
  //   beforeEach(async () => {
  //     vi.mocked(axios.get).mockResolvedValueOnce(PLANETS_DATA);
  //   });

  it('should get all planets', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce(PLANETS_DATA);

    const { result } = renderHook(() => usePlanetsData(), {
      wrapper: TestProviders,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.length).toBe(2);
    expect(axios.get).toHaveBeenCalledWith(PLANETS_URL);
  });

  it('should get a planet', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce(PLANET_DATA);

    const { result } = renderHook(
      () => usePlanetData({ homeworld: PLANET_URL }),
      {
        wrapper: TestProviders,
      }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toStrictEqual({
      name: 'Tatooine',
    });
    expect(axios.get).toHaveBeenCalledWith(PLANET_URL);
  });

  //   it('should get data based on the employment filter', async () => {
  //     const { result } = renderHook(
  //       () => usePeopleData({ employmentFilter: ['contractor'], searchTerm: '' }),
  //       {
  //         wrapper: TestProviders,
  //       }
  //     );
  //     await waitFor(() => expect(result.current.isSuccess).toBe(true));

  //     expect(axios.get).toHaveBeenCalledWith(VALID_URL, ONLY_EMPLOYMENT_PARAM);
  //   });
});
