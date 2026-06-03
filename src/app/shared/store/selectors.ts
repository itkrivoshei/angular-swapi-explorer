import { createSelector, createFeatureSelector } from "@ngrx/store";
import { FilmsState, AppState } from "./state";

export const selectCharactersState = createSelector(
  (state: AppState) => state.characters,
  (charactersState) => charactersState,
);
export const selectFilmsState = createFeatureSelector<FilmsState>("films");

export const selectSelectedCharacter = createSelector(
  selectCharactersState,
  (charactersState) => charactersState?.selected,
);

export const selectAllFilms = createSelector(
  (state: AppState) => state.films,
  (filmsState: FilmsState) => (filmsState ? filmsState.list : []),
);

export const selectSelectedFilm = createSelector(
  selectFilmsState,
  (filmsState: FilmsState) => (filmsState ? filmsState.selected : null),
);
