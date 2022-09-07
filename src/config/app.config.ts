const AppConfig = {
  /*
  |--------------------------------------------------------------------------
  | Application Meta Data
  |--------------------------------------------------------------------------
  |
  | This values are defined in the package.json.
  |
  */
  name: process.env.APP_NAME,

  /*
  |--------------------------------------------------------------------------
  | Application Port
  |--------------------------------------------------------------------------
  |
  | This value define on witch port the application is available. Default is
  | the standard port 3000
  |
  */

  port: parseInt(process.env.PORT, 10) || 3000,
};

export default AppConfig;
