import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { Character } from "../../../core/models/character.model";
import { Film } from "../../../core/models/film.model";
import { SwapiService } from "../../../core/services/swapi.service";
import * as DataActions from "../actions/actions";

@Injectable()
export class DataEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.loadData),
      mergeMap((action) =>
        this.fetchData(action.apiType, action.id).pipe(
          map((data) => this.handleSuccess(action.apiType, data)),
          catchError((error: unknown) =>
            of(
              DataActions.loadDataFailure({
                error: this.getErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly swapiService: SwapiService,
  ) {}

  private fetchData(
    apiType: "character" | "film",
    id: string,
  ): Observable<Character | Film | Film[]> {
    if (apiType === "film") {
      return id ? this.swapiService.getFilm(id) : this.swapiService.getFilms();
    }

    return this.swapiService.getCharacter(id);
  }

  private handleSuccess(
    apiType: "character" | "film",
    data: Character | Film | Film[],
  ) {
    if (apiType === "film") {
      const films = Array.isArray(data) ? data : [data as Film];
      return DataActions.loadFilmsSuccess({ films });
    }

    return DataActions.loadCharacterSuccess({ character: data as Character });
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return "Unable to load data from SWAPI.";
  }
}
