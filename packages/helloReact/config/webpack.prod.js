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
    uniqueName: "helloReact",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "helloReact",
      filename: "remoteEntry.js",
      exposes: {
        "./HelloReactApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
