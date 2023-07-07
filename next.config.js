const shouldAnalyzeBundles = process.env.ANALYZE === true;

let nextConfig = () => {
    const config = {
        reactStrictMode: true,
        eslint: {
            ignoreDuringBuilds: true,
        },
        images: {
            remotePatterns: [
                {
                    protocol: 'http',
                    hostname: 'localhost',
                    port: '3000',
                    pathname: '/api/images/**',
                },
            ],
        },
        pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts', 'mjs'],
        webpack: (config, { webpack }) => {
            config.module.rules.push({
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            });

            // Ignore 'fs' and 'child_process' modules in client-side builds
            if (!config.plugins) {
                config.plugins = [];
            }

            config.plugins.push(
                new webpack.IgnorePlugin({
                    resourceRegExp: /^fs$|^(child_|worker_)?process$/,
                    contextRegExp: /\/config$/,
                })
            );

            return config;
        },
    };

    return config;
};

if (shouldAnalyzeBundles) {
    const withNextBundleAnalyzer = require('next-bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
    });
    nextConfig = withNextBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
