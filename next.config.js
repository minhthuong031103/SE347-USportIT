// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    /* config options here */
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.nike.com',
                port: '',

            },
            {
                protocol: 'https',
                hostname: 'freight.cargo.site',
                port: '',
            }
        ],
    },
}

module.exports = nextConfig