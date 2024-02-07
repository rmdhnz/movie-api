const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = merge(config, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]-[contenthash].bundle.js",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].min.css",
    }),
  ],
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
});
