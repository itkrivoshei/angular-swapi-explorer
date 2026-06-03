import { createReducer, on } from "@ngrx/store";
import * as DataActions from "../actions/actions";
import { initialCharactersState } from "../state";

export const charactersReducer = createReducer(
  initialCharactersState,
  on(DataActions.loadCharactersSuccess, (state, { characters }) => ({
    ...state,
    list: characters,
    error: null,
  })),
  on(DataActions.loadCharacterSuccess, (state, { character }) => ({
    ...state,
    selected: character,
    error: null,
  })),
  on(DataActions.loadDataFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);
