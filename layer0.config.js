'use strict'
require('dotenv').config()

module.exports = {
  connector: '@layer0/nuxt',
  backends: {},
  includeNodeModules: true,
  includeFiles: {
    'content/': true,
    'schemes/': true,
    'plugins/': true,
    './.env': './.env',
    'assets/': true,
    'middleware/': true,
    'server-middleware/': true,
    'store/': true,
  },
  prerenderConcurrency: 200,
}
