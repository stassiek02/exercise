import { createContext } from 'react';
import { CharacterService } from '../machines/types';

export const GlobalStateContext = createContext<
  | {
      characterService: CharacterService;
    }
  | undefined
>(undefined);
