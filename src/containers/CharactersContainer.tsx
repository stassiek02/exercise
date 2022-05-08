import React, { useEffect } from 'react';
import { ICharacter } from '../types/character';
import { combineFilters, getAverage } from '../helpers/helpers';
import { Header } from '../componets/Header';
import { Main } from '../componets/Main';
import { Card } from '../componets/Card';
import { Footer } from '../componets/Footer';
import { ToggleBtn } from '../componets/ToggleBtn';

import { useServices } from '../hooks/useServices';
import { useSelector } from '@xstate/react';
import { characterSelector } from '../machines/selectors';

export const CharactersContainer = () => {
  const [onlyTall, setOnlyTall] = React.useState(false);
  const [filterText, setFilterText] = React.useState('');

  const { characterService } = useServices();

  useEffect(() => {
    characterService.send({ type: 'FETCH_CHARACTERS' });
  }, [characterService]);

  const { characters, isLoading, error } = useSelector(
    characterService,
    characterSelector
  );

  const textFilter = (item: ICharacter) => {
    return item.name.toLowerCase().includes(filterText.toLowerCase());
  };
  const tallFilter = ({ height }: ICharacter) => {
    return onlyTall ? height > 100 : true;
  };
  const filteredCharacters = characters.filter(
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
          {isLoading && <p className={'loading'}>Loading...</p>}
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
};
