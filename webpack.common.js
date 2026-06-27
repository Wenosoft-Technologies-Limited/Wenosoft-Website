/* eslint-env node */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const root = (...segments) => path.resolve(__dirname, ...segments);

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: root("src/main.tsx"),
  output: {
    path: root("dist"),
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": root("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|avif|ico)$/i,
        type: "asset/resource",
        generator: { filename: "assets/img/[name].[contenthash:8][ext]" },
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: { filename: "assets/img/[name].[contenthash:8][ext]" },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: { filename: "assets/fonts/[name].[contenthash:8][ext]" },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: root("public/index.html"),
      favicon: root("src/assets/wenosoft-icon-purple.png"),
      inject: "body",
      scriptLoading: "defer",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: root("public"),
          to: ".",
          globOptions: { ignore: ["**/index.html"] },
          noErrorOnMissing: true,
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: root("tsconfig.json"),
        diagnosticOptions: { semantic: true, syntactic: true },
      },
    }),
  ],
};
