import { State } from 'xstate';
import { characterMachine } from './charactersMachine';
import { combineFilters } from '../helpers/helpers';
import { onlyTall, textFilter } from './filters';

export type CharacterDataMachine = typeof characterMachine;
export type CharacterDataState = State<CharacterDataMachine['context']>;

export const characterSelector = (state: CharacterDataState) => ({
  characters: state.context.characters,
  error: state.context.error,
  isLoading: state.matches('api.loading'),
});

export const filteredCharactersSelector = ({
  context,
}: CharacterDataState) => ({
  filteredCharacters: context.characters.filter(
    combineFilters(
      (character) => onlyTall(character, context.filters.onlyTall),
      (character) => textFilter(character, context.filters.searchTerm)
    )
  ),
  searchTerm: context.filters.searchTerm,
  onlyTall: context.filters.onlyTall,
});
