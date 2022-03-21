// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //API
  baseUrlApi : 'http://localhost:55115/',
  baseAuthApi: 'https://localhost:44348/',
  baseUserApi: 'https://localhost:44360/',
  baseStudyApi: 'https://localhost:44307/',
  // Encryption And Decryption Key:
  AESencryptionKey: '123456$#@$^@1ERF',
  AESencryptionIV: '123456$#@$^@1ERF',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
