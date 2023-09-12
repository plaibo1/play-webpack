const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const ESLintPlugin = require("eslint-webpack-plugin");
// const StylelintPlugin = require("stylelint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const babelConfig = require("./babel.config.json");

const isDev = process.env.NODE_ENV === "development";

const useBabelLoader = () => {
  return {
    loader: "babel-loader",
    options: babelConfig,
  };
};

module.exports = {
  mode: isDev ? "development" : "production",
  target: ["web", "es5"],
  entry: "./src/index.tsx",
  output: {
    filename: "static/js/bundle.[contenthash:8].js",
    path: path.resolve(__dirname, "build"),
  },
  devtool: isDev ? "eval-source-map" : false,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(ts|js)x?$/,
        use: [useBabelLoader()],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".sass", ".scss"],
  },
  devServer: {
    static: false,
    port: 3000,
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: true,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: !isDev
        ? "static/css/[name].[contenthash:8].css"
        : "static/css/[name].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
    // =========== maybe later =========== //
    // new StylelintPlugin({
    //   extensions: ["css", "sass", "scss"],
    //   fix: true,
    // }),
    // new ESLintPlugin({
    //   extensions: [".ts", ".tsx", "js", "jsx"],
    //   fix: true,
    // }),
    new ForkTsCheckerWebpackPlugin({
      async: isDev,
      typescript: {
        diagnosticOptions: {
          syntactic: true,
          semantic: true,
          declaration: false,
          global: false,
        },
        configOverwrite: {
          compilerOptions: {
            sourceMap: isDev,
            noEmit: true,
          },
        },
      },
    }),
    isDev && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  watchOptions: {
    ignored: /node_modules/,
  },
  optimization: {
    minimize: !isDev,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
