require("@babel/register");

let webpackConfig = "";
if (process.env.NODE_ENV === "production") {
  webpackConfig = "./webpack.config.prod";
} else {
  webpackConfig = "./webpack.config.dev";
}

module.exports = require(webpackConfig);
