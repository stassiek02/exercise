import React from 'react';
import './App.scss';
import { CharactersContainer } from './containers/CharactersContainer';
import { GlobalStateProvider } from './providers/GlobalStateProvider';

function App() {
  return (
    <GlobalStateProvider>
      <CharactersContainer />
    </GlobalStateProvider>
  );
}

export default App;
