import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin, of } from "rxjs";

import { Character } from "../models/character.model";
import { Film } from "../models/film.model";

@Injectable({
  providedIn: "root",
})
export class SwapiService {
  private readonly baseUrl = "https://swapi.info/api";

  constructor(private readonly http: HttpClient) {}

  getCharacter(id: string): Observable<Character> {
    return this.http.get<Character>(this.buildUrl("people", id));
  }

  getFilm(id: string): Observable<Film> {
    return this.http.get<Film>(this.buildUrl("films", id));
  }

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.buildUrl("films"));
  }

  getFilmsByUrls(filmUrls: string[]): Observable<Film[]> {
    if (!filmUrls.length) {
      return of([]);
    }

    return forkJoin(filmUrls.map((url) => this.http.get<Film>(url)));
  }

  private buildUrl(resource: "films" | "people", id?: string): string {
    return id
      ? `${this.baseUrl}/${resource}/${id}/`
      : `${this.baseUrl}/${resource}/`;
  }
}
