const { injectBabelPlugin } = require("react-app-rewired");
const rewireMobX = require("react-app-rewire-mobx");

module.exports = function override(config, env) {

    // config = injectBabelPlugin(['@babel/plugin-proposal-decorators', {legacy: true}], config);
    // config = injectBabelPlugin(['@babel/plugin-proposal-decorators', {"legacy": true}], config);
    // config = injectBabelPlugin(['babel-plugin-transform-decorators-legacy', {decoratorsBeforeExport: false}], config);
    
    // config = injectBabelPlugin(['@babel/plugin-proposal-class-properties', {"loose": true}], config);
    // ["@babel/plugin-proposal-decorators", { "legacy": true}],
    // ["@babel/plugin-proposal-class-properties", { "loose": true}]
    config = injectBabelPlugin(["@babel/plugin-proposal-decorators", { "legacy": true }], config);

    config = injectBabelPlugin("babel-plugin-styled-components", config);
    // config = rewireMobX(config, env);
    

    return config;
};
