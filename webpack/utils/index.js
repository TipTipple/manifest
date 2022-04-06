const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const cp = require("child_process");
const yaml = require("js-yaml");

const getEnv = () => process.env.NODE_ENV || "development";

const isProduction = () => getEnv() === "production";

const isDevelopment = () => getEnv() === "development";

const getEnvConfig = () => {
  return Object.entries(process.env).reduce((mem, [key, value]) => {
    if (!PREFIX_REGEX.test(key)) return mem;
    const keyPath = parseEnvKey(key);
    const parsedValue = parseEnvValue(value);
    return _.set(mem, keyPath, parsedValue);
  }, {});
};

const getConfig = () => {
  const env = getEnv();
  const file = path.resolve("config.yml");
  const data = yaml.load(fs.readFileSync(file));
  const config = data[env] || data.default;
  const release = cp.execSync("git rev-parse HEAD").toString().trim();
  const configFromEnv = getEnvConfig();
  const resultConfig = _.merge(config, configFromEnv);

  return { ...resultConfig, env, release };
};

module.exports = {
  getEnv,
  getConfig,
  isProduction,
  isDevelopment,
};
