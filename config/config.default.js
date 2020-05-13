/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589201852514_9215';

  // add your middleware config here
  
  config.middleware = [ 'printdate', 'auth'];
  config.printdate = {
    aaa : 'aaa'
  }

  config.view = {
    mapping: {
        '.html': 'ejs'
    }
}
config.api = 'http://www.phonegap100.com/'

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
