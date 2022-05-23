import { characterMachine } from './charactersMachine';
import { interpret } from 'xstate';

it('should reach loading state', () => {
  const expectedValue = 'api.loading';
  const actualState = characterMachine.transition('idle', {
    type: 'FETCH_CHARACTERS',
  });
  expect(actualState.matches(expectedValue)).toBeTruthy();
});
const mockData = [
  {
    name: 'Luke Skywalker',
    height: '183',
  },
];
it('should eventually reach "success"', (done) => {
  const mockFetchMachine = characterMachine.withConfig({
    services: {
      fetchCharacters: () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              results: mockData,
            });
          }, 50);
        }),
    },
  });

  let previusState: string | null = null;
  const fetchService = interpret(mockFetchMachine).onTransition((state) => {
    if (state.matches('api.idle') && previusState === 'loading') {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(state.context).toMatchInlineSnapshot(`
        Object {
          "characters": Array [
            Object {
              "height": 183,
              "name": "Luke Skywalker",
            },
          ],
          "error": null,
          "filters": Object {
            "onlyTall": false,
            "searchTerm": "",
          },
        }
      `);
      done();
    }

    previusState = (state.value as { api: string; filter: 'string' }).api;
  });

  fetchService.start();

  fetchService.send({ type: 'FETCH_CHARACTERS' });
});

it('should eventually reach "error"', (done) => {
  const mockFetchMachine = characterMachine.withConfig({
    services: {
      fetchCharacters: () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject({
              error: 'Error',
            });
          }, 50);
        }),
    },
  });

  let previusState: string | null = null;

  const fetchService = interpret(mockFetchMachine).onTransition((state) => {
    if (state.matches('api.error') && previusState === 'loading') {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(state.context).toMatchInlineSnapshot(`
        Object {
          "characters": Array [],
          "error": "Error",
          "filters": Object {
            "onlyTall": false,
            "searchTerm": "",
          },
        }
      `);
      done();
    }
    previusState = (state.value as { api: string; filter: 'string' }).api;
  });

  fetchService.start();
  fetchService.send({ type: 'FETCH_CHARACTERS' });
});
