# VitrageDashboardNg2

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## TODO:
* - V - Connect to openstack
* - V - Get vitrage API
* - V - Refactor to ngModules: OpenstackLoginModule, VitrageAPIModule
* - V - Add Routing after a success login
* - V - Style Login page
* - Login page: Loading, button disable, handle errors, handle form validations
* - Bootstrap and Fontawesome as part of the project, and not from CDN
* - Add guard until valid token
* - Add interceptor for 401, 403
* - BDSM - https://github.com/500tech/bdsm
* - Add Material Design, Angular Bootstrap-2
* - Add chart library: http://js.cytoscape.org/

## CORS
Add this line:
    [cors]
    allowed_origin = *

to both files: 
    /etc/keystone/keystone.conf 
    /etc/Vitrage/Vitrage.conf