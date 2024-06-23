import '@testing-library/jest-dom/vitest';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  userEvent,
} from '@/test/utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import Page from './page';
import {
  PLANETS_URL,
  PLANETS_DATA,
  CHARACTERS_URL,
  CHARACTERS_DATA,
  CHARACTER_URL,
  CHARACTER_DATA,
} from '@/test/constants';

vi.mock('axios');

describe('CharacterList', () => {
  beforeEach(async () => {
    vi.mocked(axios.get).mockImplementation((url) => {
      switch (url) {
        case PLANETS_URL:
          return Promise.resolve(PLANETS_DATA);
        case CHARACTERS_URL:
          return Promise.resolve(CHARACTERS_DATA);
        case CHARACTER_URL:
          return Promise.resolve(CHARACTER_DATA);
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

  it('should load more characters when clicking load more', async () => {
    await waitForElementToBeRemoved(() => screen.queryAllByTestId('loading'));
    await userEvent.click(screen.getByRole('button', { name: /load more/i }));
    expect(axios.get).toHaveBeenCalledWith(CHARACTERS_URL, {
      params: { page: 2 },
    });
    expect(screen.getAllByRole('img').length).toBe(4);
  });

  it('should display error message when request fails', async () => {
    await waitForElementToBeRemoved(() => screen.queryAllByTestId('loading'));
    vi.mocked(axios.get).mockRejectedValue(new Error('error message'));
    await userEvent.click(screen.getByRole('button', { name: /load more/i }));
    expect(screen.getByText('error message')).toBeInTheDocument();
  });
});
