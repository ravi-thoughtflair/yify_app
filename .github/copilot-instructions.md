# Copilot Instructions for Yify Browser (Ionic Angular App)

## Project Overview

- This is an Ionic 3 hybrid Angular application for browsing YIFY movies using the YTS API ([API details](https://yts.am/api)).
- The main app logic is in `src/app/`, with pages in `src/pages/`, models in `src/models/`, and providers/services in `src/providers/`.
- The app is structured using Angular modules and Ionic navigation patterns.

## Architecture & Data Flow

- **Pages**: Each feature/page (e.g., Home, Search, MovieDetails) is in its own subfolder under `src/pages/`, with separate `.html`, `.ts`, and `.module.ts` files.
- **Providers**: API communication is handled in `src/providers/yify-movies/yify-movies.ts`. App settings are managed in `src/providers/settings/settings.ts`.
- **Models**: Data structures (e.g., movie objects) are defined in `src/models/moviesjson.ts`.
- **Theme**: SCSS files in `src/theme/` control app-wide and dark/light themes.
- **Assets**: Fonts and images are in `src/assets/` and `resources/`.

## Developer Workflows

- **Install dependencies**: `npm install`
- **Run app locally**: `ionic serve`
- **Build APK**: `ionic cordova platform add android && ionic cordova build android --prod`
- **Cordova setup**: Install globally with `npm install -g cordova` (see README for platform-specific details).
- **Node/Ionic versions**: Use Node.js >=8.x, npm >=5.x, Ionic 3.x for compatibility.

## Project-Specific Patterns

- **Page modules**: Each page uses its own Angular module for lazy loading (`*.module.ts`).
- **Service usage**: Use providers for all API and settings logic; do not fetch data directly in page components.
- **Theme switching**: Use SCSS files in `src/theme/` for dark/light mode; reference variables from `variables.scss`.
- **Navigation**: Use Ionic's navigation stack (`NavController`) for page transitions.
- **API integration**: All YIFY API calls should go through the provider, not directly from components.

## Integration Points

- **YIFY API**: All movie data is fetched from the YTS API via the provider.
- **Cordova plugins**: For native builds, ensure required plugins are installed and configured in `config.xml`.
- **Manifest/service worker**: PWA support files are in `src/manifest.json` and `src/service-worker.js`.

## Key Files & Directories

- `src/app/app.module.ts`: Main Angular module
- `src/app/main.ts`: App bootstrap
- `src/providers/yify-movies/yify-movies.ts`: YIFY API integration
- `src/pages/`: All UI pages
- `src/models/moviesjson.ts`: Movie data structures
- `src/theme/`: SCSS theme files

## Example Patterns

- To add a new page: create a folder in `src/pages/`, add `.html`, `.ts`, `.module.ts`, and update navigation as needed.
- To fetch movies: inject `YifyMoviesProvider` and call its methods.
- To change theme: update SCSS in `src/theme/` and reference variables.

---

If any section is unclear or missing, please provide feedback to improve these instructions.
