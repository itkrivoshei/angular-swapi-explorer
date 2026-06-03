import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Film } from "../../core/models/film.model";
import { loadData } from "../../shared/store/actions/actions";
import { AppState } from "../../shared/store/state";
import { selectAllFilms } from "../../shared/store/selectors";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  protected readonly films$: Observable<Film[]> = this.store
    .select(selectAllFilms)
    .pipe(
      map((films) => [...films].sort((a, b) => a.episode_id - b.episode_id)),
    );

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadData({ apiType: "film", id: "" }));
  }

  protected trackByEpisodeId(_: number, film: Film): number {
    return film.episode_id;
  }

  protected getFilmResourceId(url: string): string {
    const match = /\/films\/(\d+)\/?$/.exec(url);
    return match?.[1] ?? "";
  }
}
