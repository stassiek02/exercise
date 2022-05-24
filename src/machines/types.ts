import { ICharacter } from '../types/character';
import { Interpreter } from 'xstate';

export type Context = {
  characters: ICharacter[];
  error: Error | null;
  page: number;
  pageCount: number;
  filters: {
    onlyTall: boolean;
    searchTerm: string;
  };
};
export type Events =
  | { type: 'FETCH_CHARACTERS' }
  | { type: 'CHANGE_PAGE'; page: number }
  | { type: 'RETRY' }
  | { type: 'TOGGLE_HEIGHT_FILTER'; isOn: boolean }
  | { type: 'SET_SEARCH_TERM_FILTER'; searchTerm: string };

export type CharacterService = Interpreter<
  Context,
  any,
  Events,
  { value: any; context: Context }
>;
