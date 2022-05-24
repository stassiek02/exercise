import React from 'react';
import ReactPaginate from 'react-paginate';
import { Header } from './Header';
import { Main } from './Main';
import { ICharacter } from '../types/character';
import { Card } from './Card';
import { Footer } from './Footer';
import { ToggleBtn } from './ToggleBtn';

export type CharactersListProps = {
  pageCount: number;
  onPageChange: (page: number) => void;
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
  pageCount,
  onPageChange,
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
      {characters && (
        <ReactPaginate
          nextClassName={'btn'}
          previousClassName={'btn'}
          pageLinkClassName={'link'}
          activeLinkClassName={'active'}
          containerClassName={'pagination'}
          breakLabel="..."
          nextLabel="Next"
          onPageChange={(selectedItem) => onPageChange(selectedItem.selected)}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="Previous"
        />
      )}
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
