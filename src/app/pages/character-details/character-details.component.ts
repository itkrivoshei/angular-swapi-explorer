import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { filter, map, shareReplay, switchMap, tap } from "rxjs/operators";

import { Character } from "../../core/models/character.model";
import { Film } from "../../core/models/film.model";
import { SwapiService } from "../../core/services/swapi.service";
import { loadData } from "../../shared/store/actions/actions";
import { selectSelectedCharacter } from "../../shared/store/selectors";
import { AppState } from "../../shared/store/state";

@Component({
  selector: "app-character-details",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./character-details.component.html",
  styleUrls: ["./character-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailsComponent implements OnInit {
  protected readonly character$: Observable<Character | null> =
    this.store.select(selectSelectedCharacter);

  protected readonly films$: Observable<Film[]> = this.character$.pipe(
    switchMap((character) => {
      if (!character || character.films.length === 0) {
        return of([]);
      }

      return this.swapiService.getFilmsByUrls(character.films);
    }),
    map((films) => [...films].sort((a, b) => a.episode_id - b.episode_id)),
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
        tap((id) =>
          this.store.dispatch(loadData({ apiType: "character", id })),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected trackByFilmEpisode(_: number, film: Film): number {
    return film.episode_id;
  }

  protected getFilmIdFromUrl(filmUrl: string): string {
    const matches = /films\/(\d+)/.exec(filmUrl);
    return matches?.[1] ?? "";
  }
}
