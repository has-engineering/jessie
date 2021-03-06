const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const path = require('path');

const addSrcAsModule = (config) => {
  const newConfig = config;
  newConfig.resolve.modules = [path.resolve(__dirname, 'src'), ...newConfig.resolve.modules ];

  return newConfig;
};

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config); // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': '#00b9c6',
      '@layout-trigger-background': '#3F5D5F',
      '@layout-header-background': '#00b9c6',
      '@layout-footer-background': 'transparent',
      '@layout-sider-background': 'transparent'
    }
  })(config, env);
  config = addSrcAsModule(config);
  config = require('react-app-rewire-css-modules-extensionless').webpack(config, env, { test: /\.module.css$/ });
  return config;
};
