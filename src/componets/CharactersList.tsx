import { Header } from './Header';
import { Main } from './Main';
import { ICharacter } from '../types/character';
import { Card } from './Card';
import { Footer } from './Footer';
import { ToggleBtn } from './ToggleBtn';
import React from 'react';

export type CharactersListProps = {
  characters: ICharacter[];
  isLoading: boolean;
  error: Error | null;
  onlyTall: boolean;
  searchTerm: string;
  onSearchChange: (filter: string) => void;
  onToggleChange: () => void;
  averageHeight: string;
  retryFetch: () => void;
};
export const CharactersList = ({
  characters,
  isLoading,
  error,
  onlyTall,
  searchTerm,
  onSearchChange,
  onToggleChange,
  averageHeight,
  retryFetch,
}: CharactersListProps) => {
  return (
    <>
      <Header>
        <input
          value={searchTerm}
          className={'filter'}
          name={'filter'}
          placeholder={'Filter...'}
          onChange={(e) => onSearchChange(e.currentTarget.value)}
        />
      </Header>
      <Main>
        <ul className={'list'}>
          {error && (
            <div>
              <p className={'text'}>Something went wrong</p>
              <button onClick={() => retryFetch()} className={'btn'}>
                Try again
              </button>
            </div>
          )}
          {characters.map(({ name, height }: ICharacter) => (
            <Card key={name} name={name} height={height} />
          ))}
          {isLoading && <p className={'text'}>Loading...</p>}
        </ul>
      </Main>
      <Footer>
        <ToggleBtn
          onToggle={() => onToggleChange()}
          value={onlyTall}
          label={'Include only tall'}
        />
        <div>
          Average Height: <span className={'height'}>{averageHeight}</span>
        </div>
      </Footer>
    </>
  );
};
