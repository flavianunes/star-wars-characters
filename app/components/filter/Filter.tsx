import { useState } from 'react';
import Button from '../button/Button';
import { TPlanet } from '@/utils/hooks/usePlanetsData';

interface FilterProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: TPlanet[];
  filter: (value: string) => void;
}

const Filter = ({ options, value, filter, ...props }: FilterProps) => {
  const [selected, setSelected] = useState(value || 'all');

  function handleChange(value: string) {
    setSelected(value);
    filter(value);
  }

  return (
    <form className="flex justify-between py-6.5 md:px-13 px-4 border-y-1 border-gray-extra-lighter items-center">
      <label htmlFor="homeworld-filter" className="text-gray flex gap-3">
        Filter by:
        <select
          id="homeworld-filter"
          value={selected}
          onChange={(e) => handleChange(e.target.value)}
          {...props}
          className="text-blue border-b-1 border-gray-light min-w-48"
        >
          <option value="all">All</option>
          {options.map(({ name }, i) => (
            <option value={i} key={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <Button
        type="reset"
        onClick={() => handleChange('all')}
        className="w-38 text-xs leading-9 text-gray-extra-light border-gray-extra-light hidden md:block"
      >
        Clear all
      </Button>
    </form>
  );
};

export default Filter;
