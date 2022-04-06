const path = require("path");
const utils = require("./webpack/utils");

const THEMES = ["dc", "azn", "fc", "mb", "sc"];

const getModules = (env, argv) => {
  if (utils.isDevelopment()) {
    const theme = argv.env.theme || "sc";
    const configPath = path.resolve("webpack/config", utils.getEnv());
    return require(configPath)(theme);
  } else {
    const configPath = path.resolve("webpack/config/production");
    return THEMES.map((theme) => require(configPath)(theme));
  }
};

module.exports = getModules;
