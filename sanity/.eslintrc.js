const packageJSON = require('./package.json');

module.exports = {
  extends: '@edwmurph/eslint-config/react',
  settings: {
    react: {
      version: packageJSON.dependencies.react,
    },
  },
};
