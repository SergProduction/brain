var path = require("path");

module.exports = {
  entry: {
    game: ["./index.js"]
  },
  output: {
    path: path.resolve(__dirname, "public/js/"),
    publicPath: "/public/js/",
    filename: "[name].js"
  },
  devtool: "eval",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
    watchContentBase: true
  }
};