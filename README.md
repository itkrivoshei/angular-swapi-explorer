<div align="center">

# Angular SWAPI Explorer

Angular single-page app for browsing Star Wars films and characters from the SWAPI-compatible [`swapi.info`](https://swapi.info/) API.

[![Live app](https://img.shields.io/badge/live-app-2ea44f?style=for-the-badge&logo=githubpages&logoColor=white&labelColor=0f172a)](https://itkrivoshei.github.io/angular-swapi-explorer/)
[![CI](https://img.shields.io/github/actions/workflow/status/itkrivoshei/angular-swapi-explorer/ci.yml?branch=main&style=for-the-badge&label=ci&logo=githubactions&logoColor=white&labelColor=0f172a)](https://github.com/itkrivoshei/angular-swapi-explorer/actions/workflows/ci.yml)
[![Deploy](https://img.shields.io/github/actions/workflow/status/itkrivoshei/angular-swapi-explorer/deploy-pages.yml?branch=main&style=for-the-badge&label=deploy&logo=githubactions&logoColor=white&labelColor=0f172a)](https://github.com/itkrivoshei/angular-swapi-explorer/actions/workflows/deploy-pages.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/itkrivoshei/angular-swapi-explorer/codeql.yml?branch=main&style=for-the-badge&label=codeql&logo=github&logoColor=white&labelColor=0f172a)](https://github.com/itkrivoshei/angular-swapi-explorer/actions/workflows/codeql.yml)
[![Angular](https://img.shields.io/badge/Angular-21-dd0031?style=for-the-badge&logo=angular&logoColor=white&labelColor=0f172a)](https://angular.dev/)
[![License](https://img.shields.io/github/license/itkrivoshei/angular-swapi-explorer?style=for-the-badge&labelColor=0f172a)](LICENSE)

</div>

## Application Model

| Route                                                                | View                                        |
| -------------------------------------------------------------------- | ------------------------------------------- |
| [`/home`](https://itkrivoshei.github.io/angular-swapi-explorer/home) | Film list sorted by episode                 |
| `/films/:id`                                                         | Film metadata with linked character records |
| `/characters/:id`                                                    | Character profile with related films        |

The app uses lazy-loaded standalone pages, NgRx state slices for films and characters, and RxJS streams for API orchestration.

## Tech Stack

| Area           | Tools                                                                                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework      | [Angular 21](https://angular.dev/)                                                                                                                                            |
| State          | [NgRx Store](https://ngrx.io/guide/store), [NgRx Effects](https://ngrx.io/guide/effects)                                                                                      |
| Reactive layer | [RxJS](https://rxjs.dev/)                                                                                                                                                     |
| API            | [`swapi.info`](https://swapi.info/)                                                                                                                                           |
| Styling        | SCSS dark Star Wars-style interface                                                                                                                                           |
| Testing        | Karma tests in headless Chrome                                                                                                                                                |
| Hosting        | [GitHub Pages](https://pages.github.com/)                                                                                                                                     |
| Automation     | [GitHub Actions](https://github.com/itkrivoshei/angular-swapi-explorer/actions), [CodeQL](https://github.com/itkrivoshei/angular-swapi-explorer/actions/workflows/codeql.yml) |

## Implementation Notes

- Angular standalone pages are lazy-loaded through client routing.
- `SwapiService` wraps [`https://swapi.info/api`](https://swapi.info/api).
- NgRx Store and Effects separate API loading paths from page components.
- GitHub Actions deploys the browser build to GitHub Pages with a SPA fallback.
- Source code is organized around core services, page-level views, and shared store slices.

## Local Workflow

```bash
git clone https://github.com/itkrivoshei/angular-swapi-explorer.git
cd angular-swapi-explorer
npm ci
npm start
```

Open `http://localhost:4200`.

## Scripts

Scripts are defined in [`package.json`](package.json).

| Command                                                       | Description                             |
| ------------------------------------------------------------- | --------------------------------------- |
| `npm start`                                                   | Run `ng serve`                          |
| `npm run build`                                               | Build production assets                 |
| `npm run build:pages -- --base-href /angular-swapi-explorer/` | Build for the GitHub Pages URL          |
| `npm run test:ci`                                             | Run Karma tests once in headless Chrome |
| `npm run verify`                                              | Run tests and production build          |

## Source Layout

```text
src/app/
├── core/
│   ├── models/
│   └── services/swapi.service.ts
├── pages/
│   ├── character-details/
│   ├── film-details/
│   └── home/
└── shared/store/
```

Key files:

- [`src/app/core/services/swapi.service.ts`](src/app/core/services/swapi.service.ts) wraps the SWAPI-compatible API.
- [`src/app/pages/home`](src/app/pages/home) renders the film list.
- [`src/app/pages/film-details`](src/app/pages/film-details) renders film metadata and linked characters.
- [`src/app/pages/character-details`](src/app/pages/character-details) renders character profiles.
- [`src/app/shared/store`](src/app/shared/store) contains shared NgRx state logic.

## Automation

- [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs tests and project verification.
- [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) builds and publishes the app to [GitHub Pages](https://itkrivoshei.github.io/angular-swapi-explorer/).
- [`.github/workflows/codeql.yml`](.github/workflows/codeql.yml) runs GitHub CodeQL analysis.

## License

[MIT](LICENSE)
