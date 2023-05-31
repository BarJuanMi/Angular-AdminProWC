// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /*base_url: 'http://localhost:3001/api',*/
  base_url: 'http://44.208.35.77:3001/api',
  /*base_url_msbackendwcgestdoc: 'http://localhost:3006/api',
  base_url_msbackendwcpersonalrh: 'http://localhost:3007/api',
  base_url_msbackendwcprocint: 'http://localhost:3008/api',
  base_url_msbackendwcuploadfile: 'http://localhost:3009/api',
  base_url_msbackendwcutils: 'http://localhost:3010/api',*/
  url_load_pdf_pazysalvo: '/files/uploadspdf/obtenerpdf/pazysalvos/',
  url_load_pdf_hojas_vida: '/files/uploadspdf/obtenerpdf/hojasvida/',
  url_load_pdf_ausentismo: '/files/uploadspdf/obtenerpdf/ausentismos/',
  url_load_pdf_memorando: '/files/uploadspdf/obtenerpdf/memorandos/',
  url_load_pdf_contrato: '/files/uploadspdf/obtenerpdf/contratos/',
  url_load_zip_contrato: '/files/uploadszip/obtenerzip/contratos/',
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
