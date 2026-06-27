/* eslint-env node */
const path = require("path");
const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const common = require("./webpack.common.js");

/** @type {import('webpack').Configuration & { devServer?: import('webpack-dev-server').Configuration }} */
module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  output: {
    filename: "assets/js/[name].js",
    chunkFilename: "assets/js/[name].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: { syntax: "typescript", tsx: true, dynamicImport: true },
              transform: {
                react: { runtime: "automatic", development: true, refresh: true },
              },
              target: "es2022",
            },
            module: { type: "es6" },
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin({ overlay: { sockIntegration: "wds" } })],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    open: true,
    compress: true,
    client: {
      logging: "warn",
      overlay: { errors: true, warnings: false },
    },
    static: {
      directory: path.resolve(__dirname, "public"),
      publicPath: "/",
      watch: true,
    },
  },
  performance: { hints: false },
});
