/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/pricing_info',
        destination: 'https://deepwhale-ai-cloudformation-template-public.s3.us-east-1.amazonaws.com/deepwhale-ai-front-end-exercise/deepwhaleai_sample_data_fe_1st-step.csv',
      },
    ];
  },
};

module.exports = nextConfig;
