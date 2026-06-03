import { Routes } from "@angular/router";

export const appRoutes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadComponent: () =>
      import("./pages/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "films/:id",
    loadComponent: () =>
      import("./pages/film-details/film-details.component").then(
        (m) => m.FilmDetailsComponent,
      ),
  },
  {
    path: "characters/:id",
    loadComponent: () =>
      import("./pages/character-details/character-details.component").then(
        (m) => m.CharacterDetailsComponent,
      ),
  },
];
