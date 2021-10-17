module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
          'api/*': ['api/*'],
          'layouts/*': ['layouts/*'],
          'assets/*': ['assets/*'],
          'constant/*': ['constant/*'],
          'locales/*': ['locales/*'],
          'store/*': ['store/*'],
          'components/*': ['components/*'],
          'shared/*': ['shared/*'],
          'templates/*': ['templates/*'],
          'pages/*': ['pages/*'],
        },
      },
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: true,
        regenerator: false,
      },
    ],
    '@babel/proposal-object-rest-spread',
  ],
};
