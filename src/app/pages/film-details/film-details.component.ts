import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { Observable, combineLatest, of } from "rxjs";
import { filter, map, shareReplay, switchMap, tap } from "rxjs/operators";

import { Character } from "../../core/models/character.model";
import { Film } from "../../core/models/film.model";
import { SwapiService } from "../../core/services/swapi.service";
import { loadData } from "../../shared/store/actions/actions";
import { selectSelectedFilm } from "../../shared/store/selectors";
import { AppState } from "../../shared/store/state";

interface CharacterLink {
  id: string;
  name: string;
}

@Component({
  selector: "app-film-details",
  templateUrl: "./film-details.component.html",
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ["./film-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailsComponent implements OnInit {
  protected readonly film$: Observable<Film | null> =
    this.store.select(selectSelectedFilm);

  protected readonly characterLinks$: Observable<CharacterLink[]> =
    this.film$.pipe(
      filter((film): film is Film => Boolean(film)),
      switchMap((film) => {
        if (!film.characters.length) {
          return of([]);
        }

        return combineLatest(
          film.characters.map((url) => {
            const characterId = this.extractPeopleId(url);

            return this.swapiService.getCharacter(characterId).pipe(
              map((character: Character) => ({
                id: characterId,
                name: character.name,
              })),
            );
          }),
        );
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>,
    private readonly swapiService: SwapiService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get("id")),
        filter((id): id is string => Boolean(id)),
        tap((id) => this.store.dispatch(loadData({ apiType: "film", id }))),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected trackByCharacterId(_: number, character: CharacterLink): string {
    return character.id;
  }

  private extractPeopleId(url: string): string {
    const match = /\/people\/(\d+)\/?$/.exec(url);
    return match?.[1] ?? "";
  }
}
