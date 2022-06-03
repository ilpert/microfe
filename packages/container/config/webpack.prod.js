const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.VERCEL_URL;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    // publicPath: domain,
    uniqueName: "container",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        helloReact: `helloReact@https://helloreact-odnazsx76-ilpert.vercel.app/remoteEntry.js`,
        helloVue: `helloVue@https://hellovue-pk4f6bf4b-ilpert.vercel.app/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
