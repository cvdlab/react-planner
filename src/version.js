/* eslint-disable no-undef */
/**
 * Things here are injected implicitly by webpack.DefinePlugin()
 */
const REV = defineREV;
const ENV = process.env.NODE_ENV;
// version will only read 0.0.0-development in development
const VERSION = defineVersion;

export { REV, ENV, VERSION };
