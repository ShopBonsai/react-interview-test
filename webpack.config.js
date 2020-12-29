const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './client/src/index.html',
});

const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
    .default;
const styledComponentsTransformer = createStyledComponentsTransformer();
module.exports = {
    entry: './client/src/index.tsx',
    module: {
        rules: [
            {
                test: /\.ts|\.tsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        // options: {
                        //     plugins: [
                        //         [
                        //             'babel-plugin-styled-components',
                        //             {
                        //                 displayName: false,
                        //             },
                        //         ],
                        //     ],
                        // },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            getCustomTransformers: () => ({
                                before: [styledComponentsTransformer],
                            }),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [
            '*',
            '.tsx',
            '.ts',
            '.js',
            '.mjs',
            '.json',
            '.gql',
            '.graphql',
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [htmlPlugin],
};
