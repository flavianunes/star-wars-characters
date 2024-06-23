import { renderHook, waitFor } from '@/test/utils';
import { describe, expect, it, vi } from 'vitest';
import { useCharactersData } from './useCharactersData';
import axios from 'axios';
import { TestProviders } from '@/test/provider';
import {
  CHARACTER_DATA,
  CHARACTER_URL,
  CHARACTERS_DATA,
  CHARACTERS_URL,
} from '@/test/constants';

vi.mock('axios');

describe('useCharactersData', () => {
  //   beforeEach(async () => {
  //     vi.mocked(axios.get).mockResolvedValueOnce(PLANETS_DATA);
  //   });

  it('should get all characters from first page', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce(CHARACTERS_DATA);

    const { result } = renderHook(() => useCharactersData(), {
      wrapper: TestProviders,
    });
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(result.current.allCharactersData?.pages.length).toBe(1);
    expect(axios.get).toHaveBeenCalledWith(CHARACTERS_URL, {
      params: { page: 1 },
    });
  });

  it('should get filtered characters', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce(CHARACTER_DATA);

    const { result } = renderHook(
      () =>
        useCharactersData({
          name: 'Naboo',
          residents: [CHARACTER_URL],
        }),
      {
        wrapper: TestProviders,
      }
    );
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(axios.get).toHaveBeenCalledWith(CHARACTER_URL);
  });
});
