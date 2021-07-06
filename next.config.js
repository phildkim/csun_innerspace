const withTM = require('next-transpile-modules')([
  '@react-three/drei',
  '@react-three/fiber',
  'three'
]);

module.exports = withTM({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      },
    ]
  },
  env: {
    SECRET_JWT_API_KEY: process.env.SECRET_JWT_API_KEY,
    SECRET_MONGODB_API_KEY: process.env.SECRET_MONGODB_API_KEY,
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    SECRET_GOOGLE_API_KEY: process.env.SECRET_GOOGLE_API_KEY
  }
});