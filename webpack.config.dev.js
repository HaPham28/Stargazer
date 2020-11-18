const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js",
        astro_timeline: "./src/astroTimeline.js",
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {test: /\.css$/, use: ["style-loader", "css-loader"]},
            {test: /\.(png|svg|jpe?g|gif)$/i, loader: 'file-loader', options: {name: "assets/[hash].[ext]"}},
            {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Stargazer",
            template: "./src/index.html",
            excludeChunks: [],
            filename: "index.html",
        }),
        new HtmlWebpackPlugin({
            title: "Profile",
            template: "./src/profile.html",
            excludeChunks: ["index"],
            filename: "profile.html"
        }),
        new HtmlWebpackPlugin({
            title: "About",
            template: "./src/about.html",
            excludeChunks: ["index"],
            filename: "about.html"
        }),
    ],
    experiments: {
        syncWebAssembly: true,
    },
};
