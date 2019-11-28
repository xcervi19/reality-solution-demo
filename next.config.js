const path = require("path");
const withTypeScript = require("@zeit/next-typescript");
const withCustomBabelConfigFile = require("next-plugin-custom-babel-config");

module.exports = withCustomBabelConfigFile(
    withTypeScript({
    babelConfigFile: path.resolve("babel.config.js")
  }),
);