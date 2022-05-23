import React, { useEffect } from 'react';
import { useServices } from '../hooks/useServices';
import { useSelector } from '@xstate/react';
import {
  characterSelector,
  filteredCharactersSelector,
} from '../machines/selectors';
import { getAverage } from '../helpers/helpers';
import { CharactersList } from '../componets/CharactersList';

export const CharactersContainer = () => {
  const { characterService } = useServices();

  useEffect(() => {
    characterService.send({ type: 'FETCH_CHARACTERS' });
  }, [characterService]);

  const { isLoading, error } = useSelector(characterService, characterSelector);
  const { filteredCharacters, onlyTall, searchTerm } = useSelector(
    characterService,
    filteredCharactersSelector
  );
  const averageHeight = getAverage(filteredCharacters).toFixed(2);

  return (
    <CharactersList
      retryFetch={() => characterService.send({ type: 'RETRY' })}
      characters={filteredCharacters}
      isLoading={isLoading}
      error={error}
      onlyTall={onlyTall}
      searchTerm={searchTerm}
      onSearchChange={(v) =>
        characterService.send({
          type: 'SET_SEARCH_TERM_FILTER',
          searchTerm: v,
        })
      }
      onToggleChange={() =>
        characterService.send({
          type: 'TOGGLE_HEIGHT_FILTER',
          isOn: !onlyTall,
        })
      }
      averageHeight={averageHeight}
    />
  );
};
