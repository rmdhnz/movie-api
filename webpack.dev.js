const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(config, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devtool: false,
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    port: 3000,
    historyApiFallback: true,
    liveReload: true,
  },
});
