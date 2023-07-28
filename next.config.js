const shouldAnalyzeBundles = process.env.ANALYZE === true;

let nextConfig = () => {
    const config = {
        reactStrictMode: true,
        eslint: {
            ignoreDuringBuilds: true,
        },
        output: 'standalone',
        images: {
            remotePatterns: [
                {
                    hostname: 'localhost:3000',
                    pathname: '/api/images/**',
                },
                {
                    hostname: 'zingy-hotteok-06d64f',
                    pathname: '/api/images/**',
                },
            ],
        },
        pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts', 'mjs'],
        webpack: (config, { webpack, isServer }) => {
            config.module.rules.push({
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            });

            if (!isServer) {
                config.resolve.fallback = {
                    fs: false,
                };
            }

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
