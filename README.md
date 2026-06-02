<div align="center">

# Angular SWAPI Explorer

Angular single-page app for browsing Star Wars films and characters from the SWAPI-compatible `swapi.info` API.

[![Live app](https://img.shields.io/badge/live-GitHub%20Pages-2ea44f?style=for-the-badge&logo=githubpages&logoColor=white)](https://itkrivoshei.github.io/angular-swapi-explorer/)
[![CI](https://img.shields.io/github/actions/workflow/status/itkrivoshei/angular-swapi-explorer/ci.yml?branch=main&style=for-the-badge&label=ci&logo=githubactions&logoColor=white)](https://github.com/itkrivoshei/angular-swapi-explorer/actions/workflows/ci.yml)
[![Deploy](https://img.shields.io/github/actions/workflow/status/itkrivoshei/angular-swapi-explorer/deploy-pages.yml?branch=main&style=for-the-badge&label=deploy&logo=githubactions&logoColor=white)](https://github.com/itkrivoshei/angular-swapi-explorer/actions/workflows/deploy-pages.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/itkrivoshei/angular-swapi-explorer/codeql.yml?branch=main&style=for-the-badge&label=codeql&logo=github&logoColor=white)](https://github.com/itkrivoshei/angular-swapi-explorer/actions/workflows/codeql.yml)
[![Angular](https://img.shields.io/badge/Angular-21-dd0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![License](https://img.shields.io/github/license/itkrivoshei/angular-swapi-explorer?style=for-the-badge)](LICENSE)

</div>

## Navigation Model

| Route | View |
| --- | --- |
| `/home` | Film list sorted by episode |
| `/films/:id` | Film metadata with linked character records |
| `/characters/:id` | Character profile with related films |

The app uses lazy-loaded standalone pages, NgRx state slices for films and characters, and RxJS streams for API orchestration.

## Stack Notes

- Angular 21 with client routing for GitHub Pages.
- NgRx Store and Effects for async loading paths.
- `SwapiService` wraps `https://swapi.info/api`.
- SCSS creates the dark Star Wars-style interface.
- GitHub Actions deploys the browser build to GitHub Pages with a SPA fallback.

## Local Workflow

```bash
git clone https://github.com/itkrivoshei/angular-swapi-explorer.git
cd angular-swapi-explorer
npm ci
npm start
```

Open `http://localhost:4200`.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Run `ng serve` |
| `npm run build` | Build production assets |
| `npm run build:pages -- --base-href /angular-swapi-explorer/` | Build for the Pages URL |
| `npm run test:ci` | Run Karma tests once in headless Chrome |
| `npm run verify` | Run tests and build |

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

## License

[MIT](LICENSE)
