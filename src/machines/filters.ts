import { ICharacter } from '../types/character';

export const textFilter = (item: ICharacter, searchTerm: string) => {
  return item.name.toLowerCase().includes(searchTerm.toLowerCase());
};
export const onlyTall = (character: ICharacter, onlyTall: boolean) =>
  onlyTall ? character.height > 100 : true;
