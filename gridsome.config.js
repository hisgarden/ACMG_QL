// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Quarry Lakes Demonstration Garden',
  siteDescription: 'The Quarry Lakes Demonstration Garden in Fremont is situated within the East Bay Regional Park\'s (EBRP) beautiful water-oriented recreation area. Its 450 acres includes several ponds, a swimming beach, fishing areas, picnic areas, boating, volleyball courts, hiking trails, and a rare fruit orchard. Quarry Lakes has something for everyone. And if that isn\'t enough, you can just sit in the Demonstration Garden and do nothing but enjoy the fabulous views of Mission Peak, the East Bay hills, the Livermore hills, and various wildlife.',
  siteUrl: 'https://hisgarden.dev/ACMG_QL',
  pathPrefix: '/ACMG_QL',
  plugins: [
    // Google Sheets plugin - temporarily disabled for initial deployment
    // Will be enabled once proper credentials are configured
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'articles/**/*.md',
        typeName: 'Article',
        resolveAbsolutePaths: true,
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
        },
      },
    },
    // Mock data source - using while Google Sheets is disabled
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'mock-data/**/*.md',
        typeName: 'googleSheet',
        resolveAbsolutePaths: true,
      },
    },
    // Remote image plugins - disabled while using mock data
  ],
  templates: {
    // googleSheet template - always available for mock data
    googleSheet: [
      {
        path: '/plant/:id',
        component: './src/templates/googleSheet.vue',
      },
    ],
  },
  transformers: {
    remark: {
      plugins: ['@gridsome/remark-prismjs'],
    },
  },

}
