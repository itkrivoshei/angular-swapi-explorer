import { createReducer, on } from "@ngrx/store";
import * as DataActions from "../actions/actions";
import { FilmsState, initialFilmsState } from "../state";

export const filmsReducer = createReducer<FilmsState>(
  initialFilmsState,
  on(DataActions.loadFilmsSuccess, (state, { films }) => {
    return Array.isArray(films) && films.length === 1
      ? { ...state, selected: films[0], error: null }
      : { ...state, list: films, error: null };
  }),
  on(DataActions.loadDataFailure, (state, { error }) => {
    return { ...state, error };
  }),
);
