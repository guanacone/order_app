const packageJSON = require('./package.json');

module.exports = {
  extends: '@edwmurph/eslint-config/gatsby',
  settings: {
    react: {
      version: packageJSON.dependencies.react,
    },
  },
  rules: {        
    "no-underscore-dangle": 'off'
 }
};