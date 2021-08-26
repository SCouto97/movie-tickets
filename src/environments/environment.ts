// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { movieDbConfig } from "src/app/services/config/moviedb-config";

export const environment = {
  production: false,
  movieDB: {
      apiBaseUrl: "https://api.themoviedb.org/3/movie/upcoming?",
      apiKeyArg: "api_key=" + movieDbConfig.api_key,
      langArg: "&language=en_US",
      pageArg: "&page=1"
  },
  viaCep: {
    apiBaseUrl: "https://viacep.com.br/ws/",
    apiSuffix: "/json/"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
