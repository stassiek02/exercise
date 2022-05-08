import React from 'react';
import { useInterpret } from '@xstate/react';
import { API_URL } from '../constants/constants';
import { characterMachine } from '../machines/charactersMachine';
import { GlobalStateContext } from '../context/globalStateContext';

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider = (props: Props) => {
  const characterService = useInterpret(characterMachine, {
    services: {
      fetchCharacters: () => {
        return fetch(API_URL).then((res) => res.json());
      },
    },
  });
  return (
    <GlobalStateContext.Provider value={{ characterService }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
