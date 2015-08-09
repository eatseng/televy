module.exports = {
    entry: "./televy/client.js",
    output: {
        path: __dirname + '/televy/public/js',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};