# PokemonTrainer

SPA created with Angular, where user can login with a username, catch pokemons on the catalogue page and view/remove pokemons on the trainer page.

##Start page

- Insert username to login. 
- If username exists in database, previously catched pokemons will be loaded to the user's trainer page.

##Trainer page

- View catched pokemons and remove a catched pokemon by selecting "Remove".

##Catalogue page

- View all available pokemons and load more pokemons by selecting "Click here to load more". 
- View more info of any given pokemon by selecting "More info"
- Catch a pokemon by selecting it. Only pokemons that are not catched can be added to the trainer page.
- Catched pokemons are shown with a pokeball icon.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
