import { assign, createMachine } from 'xstate';
import { Context, Events } from './types';
import { ICharacter } from '../types/character';

export const characterMachine = createMachine<Context, Events>({
  id: 'characterMachine',
  initial: 'idle',
  type: 'parallel',
  context: {
    characters: [],
    error: null,
    page: 0,
    pageCount: 0,
    filters: {
      onlyTall: false,
      searchTerm: '',
    },
  },
  states: {
    filter: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            SET_SEARCH_TERM_FILTER: {
              actions: assign({
                filters: (ctx, event) => ({
                  ...ctx.filters,
                  searchTerm: event.searchTerm,
                }),
              }),
            },
            TOGGLE_HEIGHT_FILTER: {
              actions: assign({
                filters: (ctx, event) => ({
                  ...ctx.filters,
                  onlyTall: event.isOn,
                }),
              }),
            },
          },
        },
      },
    },
    api: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            CHANGE_PAGE: {
              target: 'loading',
              actions: assign({
                page: (ctx, event) => event.page,
              }),
            },
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
                console.log(event.data);
                return {
                  pageCount: Math.floor(event.data.count / 10) + 1,
                  characters: event.data.results.map(
                    (character: ICharacter) => ({
                      ...character,
                      height: Number(character.height),
                    })
                  ),
                };
              }),
            },
            onError: {
              actions: assign((_ctx, event) => {
                return {
                  error: event.data.error,
                };
              }),
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
    },
  },
});
