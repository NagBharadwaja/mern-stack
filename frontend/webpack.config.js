const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './index.js'
  ],
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    hot: true,
  },
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      },
    ],
  },
};