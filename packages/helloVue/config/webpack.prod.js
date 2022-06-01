const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.VERCEL_URL;

const prodConfig = {
  mode: "production",
  output: {
    // filename: "[name].[contenthash].js",
    publicPath: domain,
    uniqueName: "helloVue",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "helloVue",
      filename: "remoteEntry.js",
      exposes: {
        "./HelloVueApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
