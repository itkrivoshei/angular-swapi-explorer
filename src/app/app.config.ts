import { ApplicationConfig } from "@angular/core";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";

import { appRoutes } from "./app.routes";
import { charactersReducer } from "./shared/store/reducers/characters.reducer";
import { filmsReducer } from "./shared/store/reducers/films.reducer";
import { DataEffects } from "./shared/store/effects/effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: "top" }),
    ),
    provideAnimationsAsync(),
    provideStore(
      {
        characters: charactersReducer,
        films: filmsReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
        },
      },
    ),
    provideEffects([DataEffects]),
  ],
};
