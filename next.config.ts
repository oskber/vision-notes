import withPWA from '@ducanh2912/next-pwa';


const PWA = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
});

module.exports = PWA({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                pathname: '/u/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            },
        ],

    }
});