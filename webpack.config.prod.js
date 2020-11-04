const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        index: "./src/index.js",
        astro_timeline: "./src/astroTimeline.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist_prod"),
    },
    module: {
        rules: [
            {test: /\.css$/, use: ["style-loader", "css-loader"]},
            {test: /\.(png|svg|jpe?g|gif)$/i, loader: 'file-loader', options: {name: "assets/[hash].[ext]"}},
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Stargazer",
            template: "./src/index.html",
        }),
    ],
};
