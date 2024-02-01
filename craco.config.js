// Resolves error:
//   ERROR in ./node_modules/@tastytrade/api/dist/services/tastytrade-http-client.js 141:30-46
//   Module not found: Error: Can't resolve 'https' in '/Users/dirk/www/drootracker/node_modules/@tastytrade/api/dist/services'
//   BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
//   This is no longer the case. Verify if you need this module and configure a polyfill for it.
//   If you want to include a polyfill, you need to:
//   	- add a fallback 'resolve.fallback: { "https": require.resolve("https-browserify") }'
//   	- install 'https-browserify'
//   If you don't want to include a polyfill, you can use an empty module like this:
//   	resolve.fallback: { "https": false }
const resolveFallback = {
  https: '/Users/dirk/www/drootracker/src/services/tasty-dirk-api/node_modules/https-browserify/index.js',
  http: '/Users/dirk/www/drootracker/src/services/tasty-dirk-api/node_modules/stream-http/index.js',
  url: '/Users/dirk/www/drootracker/src/services/tasty-dirk-api/node_modules/url/url.js',
  buffer: '/Users/dirk/www/drootracker/src/services/tasty-dirk-api/node_modules/buffer/index.js'
}

// const resolveFallback = {
//     https: require.resolve('https-browserify'),
//     http: require.resolve('stream-http'),
//     url: require.resolve('url/'),
//     buffer: require.resolve('buffer/'),
//   }

// Resolves error: TypeError: axios_1.default.request is not a function
//   https://github.com/facebook/create-react-app/issues/11889#issuecomment-1114928008
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {

      webpackConfig['resolve']['fallback'] = resolveFallback

      const fileLoaderRule = getFileLoaderRule(webpackConfig.module.rules)
      if(!fileLoaderRule) {
        throw new Error('File loader not found')
      }
      fileLoaderRule.exclude.push(/\.cjs$/)

      return webpackConfig
    }
  }
}

function getFileLoaderRule(rules) {
  for(const rule of rules) {
    if('oneOf' in rule) {
      const found = getFileLoaderRule(rule.oneOf)
      if(found) {
        return found
      }
    } else if(rule.test === undefined && rule.type === 'asset/resource') {
      return rule
    }
  }
}
