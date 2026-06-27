/* eslint-env node */
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common.js");

/** @type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  bail: true,
  output: {
    filename: "assets/js/[name].[contenthash:8].js",
    chunkFilename: "assets/js/[name].[contenthash:8].chunk.js",
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
                react: { runtime: "automatic", development: false, refresh: false },
              },
              target: "es2022",
            },
            module: { type: "es6" },
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash:8].css",
      chunkFilename: "assets/css/[name].[contenthash:8].chunk.css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 2020,
          compress: { passes: 2 },
          format: { comments: false },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 10,
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
          name: "react-vendor",
          chunks: "all",
          priority: 30,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          priority: 10,
        },
      },
    },
  },
  performance: {
    // The asset/entrypoint budget exists to police *code* bundles.
    // Brand images are intentional and governed by other tools (Lighthouse,
    // Netlify Image CDN). Exclude them from the budget so the warning stays
    // signal, not noise.
    maxAssetSize: 500 * 1024,
    maxEntrypointSize: 500 * 1024,
    hints: "warning",
    assetFilter: (assetFilename) => /\.(?:js|css)$/.test(assetFilename),
  },
});
