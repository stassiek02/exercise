import { assign, createMachine } from 'xstate';
import { Context, Events } from './types';
import { ICharacter } from '../types/character';

export const characterMachine = createMachine<Context, Events>({
  id: 'characterMachine',
  initial: 'idle',
  context: {
    characters: [],
    error: null,
  },
  states: {
    idle: {
      on: {
        FETCH_CHARACTERS: {
          target: 'loading',
        },
      },
    },
    loading: {
      invoke: {
        src: 'fetchCharacters',
        onDone: {
          target: 'idle',
          actions: assign((_ctx, event) => {
            return {
              characters: event.data.results.map((character: ICharacter) => ({
                ...character,
                height: Number(character.height),
              })),
            };
          }),
        },
        onError: {
          target: 'error',
        },
      },
    },
    error: {
      on: {
        RETRY: {
          target: 'loading',
        },
      },
    },
  },
});
