import { State } from 'xstate';
import { characterMachine } from './charactersMachine';

export type CharacterDataMachine = typeof characterMachine;
export type CharacterDataState = State<CharacterDataMachine['context']>;

export const characterSelector = (state: CharacterDataState) => ({
  characters: state.context.characters,
  error: state.context.error,
  isLoading: state.matches('loading'),
});
