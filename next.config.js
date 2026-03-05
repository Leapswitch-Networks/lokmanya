/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  images: {
    domains: ['localhost'],
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.lokmanyahospitals.com',
          },
        ],
        destination: 'https://lokmanyahospitals.com/:path*',
        permanent: true,
      },

      {
        source: '/doctors/our-branch',
        destination: '/our-branch',
        permanent: true,
      },
      {
        source: '/blogs/our-branch',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/knee-replacement',
        destination: '/knee-replacement-robotic',
        permanent: true,
      },
      {
        source: '/neuro-science-campaign',
        destination: '/neuro-science',
        permanent: true,
      },
      {
        source: '/doctors/dr-ashish-baviskar-',
        destination: '/doctors/dr-ashish-baviskar',
        permanent: true,
      }
      // add more redirects here
    ];
  },

};

module.exports = nextConfig;
