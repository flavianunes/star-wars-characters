import { usePlanetData } from '@/utils/hooks/usePlanetsData';
import Image from 'next/image';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  homeworld: string;
  height: number;
  mass: number;
  gender: 'female' | 'male' | 'n/a';
}

const CharacterCard = ({
  name,
  homeworld,
  height,
  mass,
  gender,
}: CardProps) => {
  const { data: homeworldData } = usePlanetData({ homeworld });
  return (
    <div className="md:w-full md:block flex gap-3">
      <Image
        width={420}
        height={230}
        src={`https://picsum.photos/420/230?random&t=${name}`}
        alt={name}
        className="md:w-auto w-28 md:h-57 h-32 mb-4 object-cover"
      />
      <div>
        <h3 className="text-black text-xl">{name}</h3>
        <p className="text-black mb-3 mt-1">{homeworldData?.name}</p>
        <ul className="text-xs text-gray-light uppercase md:block hidden">
          <li>Height &middot; {height}</li>
          <li>Mass &middot; {mass}</li>
          <li>Gender &middot; {gender}</li>
        </ul>
      </div>
    </div>
  );
};

export default CharacterCard;
