import { createAction, props } from "@ngrx/store";

import { Character } from "../../../core/models/character.model";
import { Film } from "../../../core/models/film.model";

export const loadData = createAction(
  "[Data] Load Data Request",
  props<{ apiType: "character" | "film"; id: string }>(),
);

export const loadCharactersSuccess = createAction(
  "[Character] Load Success",
  props<{ characters: Character[] }>(),
);

export const loadFilmsSuccess = createAction(
  "[Film] Load Success",
  props<{ films: Film[] }>(),
);

export const loadDataFailure = createAction(
  "[Data] Load Failure",
  props<{ error: string }>(),
);

export const loadCharacterSuccess = createAction(
  "[Character API] Load Character Success",
  props<{ character: Character }>(),
);
