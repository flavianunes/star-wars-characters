import '@testing-library/jest-dom/vitest';

import { render, screen, waitFor, fireEvent, userEvent } from '@/test/utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import Page from './page';

const PLANETS_URL = 'https://swapi.dev/api/planets/';
const CHARACTER_URL = 'https://swapi.dev/api/people/1/';
const CHARACTERS_URL = 'https://swapi.dev/api/people/';

vi.mock('axios');

describe('CharacterList', () => {
  beforeEach(async () => {
    vi.mocked(axios.get).mockImplementation((url, config) => {
      switch (url) {
        case PLANETS_URL:
          return Promise.resolve({
            data: {
              results: [
                { name: 'Tatooine', residents: [] },
                {
                  name: 'Naboo',
                  residents: [CHARACTER_URL],
                },
              ],
            },
          });
        case CHARACTERS_URL:
          return Promise.resolve({
            data: {
              results: [{ name: 'Luke Skywalker' }, { name: 'R2-D2' }],
            },
          });
        case CHARACTER_URL:
          return Promise.resolve({
            data: { name: 'Clara' },
          });
        default:
          return Promise.reject(new Error('error message'));
      }
    });
    render(<Page />);
  });

  it('should display all characters', async () => {
    expect(axios.get).toHaveBeenCalledWith(PLANETS_URL);
    expect(screen.getByText('All Characters')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByRole('img').length).toBe(2);
      expect(screen.getByRole('combobox')).toHaveValue('all');
    });
  });

  it('should display loading skeleton', async () => {
    expect(screen.getAllByTestId('loading').length).toBe(10);
  });

  it('should filter results when selecting filter', async () => {
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(PLANETS_URL);
    });
    await userEvent.selectOptions(screen.getByRole('combobox'), 'Naboo');
    expect(screen.getByRole('combobox')).toHaveValue('1');
    expect(screen.getAllByRole('img').length).toBe(1);
  });

  it('should empty message when result is empty', async () => {
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(PLANETS_URL);
    });
    await userEvent.selectOptions(screen.getByRole('combobox'), 'Tatooine');
    expect(screen.getByRole('combobox')).toHaveValue('0');
    expect(screen.getByText('No characters were found.')).toBeInTheDocument();
  });
});
