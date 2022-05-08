import { ICharacter } from '../types/character';
import { Interpreter } from 'xstate';

export type Context = {
  characters: ICharacter[];
  error: Error | null;
};
export type Events = { type: 'FETCH_CHARACTERS' } | { type: 'RETRY' };

export type CharacterService = Interpreter<
  Context,
  any,
  Events,
  { value: any; context: Context }
>;
