import CharacterCard from '../card/CharacterCard';
import { TCharacter, TPage } from '@/utils/hooks/useCharactersData';
import Button from '../button/Button';
import Loading from './CharacterListLoading';

type CharacterListProps = {
  characters: TCharacter[];
};

const CharacterList = ({ characters }: CharacterListProps) => {
  return characters.map((character: TCharacter) => {
    return (
      <CharacterCard
        key={character.name}
        name={character.name}
        homeworld={character.homeworld}
        height={character.height}
        mass={character.mass}
        gender={character.gender}
      />
    );
  });
};
export default CharacterList;
