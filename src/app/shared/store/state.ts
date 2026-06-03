import { Character } from "../../core/models/character.model";
import { Film } from "../../core/models/film.model";

export interface AppState {
  characters: CharactersState;
  films: FilmsState;
}

export interface CharactersState {
  list: Character[];
  selected: Character | null;
  error: string | null;
}

export interface FilmsState {
  list: Film[];
  selected: Film | null;
  error: string | null;
}

export const initialCharactersState: CharactersState = {
  list: [],
  selected: null,
  error: null,
};

export const initialFilmsState: FilmsState = {
  list: [],
  selected: null,
  error: null,
};
