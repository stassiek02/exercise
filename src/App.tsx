import React from 'react';
import './App.scss';
import { Header } from './componets/Header';
import { Main } from './componets/Main';
import { Footer } from './componets/Footer';
import { Card } from './componets/Card';
import { ICharacter } from './types/character';
import { ToggleBtn } from './componets/ToggleBtn';
import { combineFilters, getAverage } from './helpers/helpers';
import { useFetchCharacters } from './hooks/useFetchCharacters';

function App() {
  const [onlyTall, setOnlyTall] = React.useState(false);
  const [filterText, setFilterText] = React.useState('');
  const { data, error } = useFetchCharacters();

  const textFilter = (item: ICharacter) => {
    return item.name.toLowerCase().includes(filterText.toLowerCase());
  };
  const tallFilter = ({ height }: ICharacter) => {
    return onlyTall ? height > 100 : true;
  };
  const filteredCharacters = data.filter(
    combineFilters(textFilter, tallFilter)
  );

  const averageHeight = getAverage(filteredCharacters);
  //todo: add white mode
  //todo: add load btn at the bottom of the page  and add loading state
  //todo: add filters
  return (
    <>
      <Header>
        <input
          className={'filter'}
          name={'filter'}
          placeholder={'Filter...'}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </Header>
      <Main>
        <ul className={'list'}>
          {error && <div>Something went wrong</div>}
          {filteredCharacters.map(({ name, height }: ICharacter) => (
            <Card key={name} name={name} height={height} />
          ))}
          {!data && <p className={'loading'}>Loading...</p>}
        </ul>
      </Main>
      <Footer>
        <ToggleBtn
          onToggle={setOnlyTall}
          value={onlyTall}
          label={'Include only tall'}
        />
        <div>
          Average Height:{' '}
          <span className={'height'}>{averageHeight.toFixed(2)}</span>
        </div>
      </Footer>
    </>
  );
}

export default App;
