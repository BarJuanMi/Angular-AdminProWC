// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base_url: 'http://164.92.67.11:3001/api',
  url_load_pdf_pazysalvo: 'http://164.92.67.11:3001/api/files/uploadspdf/obtenerpdf/pazysalvos/',
  url_load_pdf_hojas_vida: '/files/uploadspdf/obtenerpdf/hojasvida/',
  url_load_pdf_resp_psico: '/files/uploadspdf/obtenerpdf/respsicologico/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
