import { assign, createMachine } from 'xstate';
import { Context, Events } from './types';

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
              characters: event.data.results,
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
