// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Quarry Lakes Demonstration Garden',
  siteDescription: 'The Quarry Lakes Demonstration Garden in Fremont is situated within the East Bay Regional Park’s (EBRP) beautiful water-oriented recreation area. Its 450 acres includes several ponds, a swimming beach, fishing areas, picnic areas, boating, volleyball courts, hiking trails, and a rare fruit orchard. Quarry Lakes has something for everyone. And if that isn’t enough, you can just sit in the Demonstration Garden and do nothing but enjoy the fabulous views of Mission Peak, the East Bay hills, the Livermore hills, and various wildlife.',
  plugins: [
    // Google Sheets plugin - only load if environment variables are set
    ...(process.env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY !== 'your_google_api_key_here' && process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SHEET_ID !== 'your_google_sheet_id_here' ? [{
      use: 'gridsome-source-google-sheets-v2',
      options: {
        apiKey: process.env.GOOGLE_API_KEY,
        spreadsheets: [
          {
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            sheets: [
              {
                sheetName: 'WebSiteList', // Example: "Sheet1" "QL_Plants"
                collectionName: 'googleSheet', // Example: "Projects" (Must be unique)
                nodeProcessor: (node) => {
                  // Get fields we can use for identification
                  const location = node.Location || '';
                  const originalId = node.ID || '';
                  const commonName = node.Common_Name || '';
                  const scientificName = node.Scientific_Name || '';
                  
                  // Create a time-based random component to ensure uniqueness
                  const timestamp = Date.now().toString();
                  const random = Math.floor(Math.random() * 100000).toString();
                  
                  // Create unique ID by combining multiple sources of uniqueness
                  // This replaces the original ID completely to avoid duplication issues
                  node.id = `plant-${location.replace(/\s+/g, '-')}-${originalId}-${timestamp}-${random}`
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, '-');
                  
                  // Store the original ID for reference
                  node.originalID = originalId;
                  
                  return node;
                },
              },
              //{
              //  sheetName: 'Natives', // Example: "Sheet2"
              //  collectionName: "googleSheet", // Example: "Users" (Must be Unique)
              //},
            ],
          },
        ],
      },
    }] : []),
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
    // Mock data source for when Google Sheets is not available
    ...(process.env.GOOGLE_API_KEY === 'your_google_api_key_here' || process.env.GOOGLE_SHEET_ID === 'your_google_sheet_id_here' ? [{
      use: '@gridsome/source-filesystem',
      options: {
        path: 'mock-data/**/*.md',
        typeName: 'googleSheet',
        resolveAbsolutePaths: true,
      },
    }] : []),
    // Remote image plugins - only load if Google Sheets plugin is loaded
    ...(process.env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY !== 'your_google_api_key_here' && process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SHEET_ID !== 'your_google_sheet_id_here' ? [
      {
        use: '@noxify/gridsome-plugin-remote-image',
        options: {
          'typeName' : 'googleSheet',
          'sourceField': 'remoteImage',
          'targetField': 'imageDownloaded',
          'targetPath': './src/assets/remoteImages'
        }
      },
      {
        use: '@noxify/gridsome-plugin-remote-image',
        options: {
          'typeName' : 'googleSheet',
          'sourceField': 'remoteImages',
          'targetField': 'imagesDownloaded',
          'targetPath': './src/assets/remoteImages'
        }
      }
    ] : [])
  ],
  templates: {
    // Only define googleSheet template if the plugin is loaded
    ...(process.env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY !== 'your_google_api_key_here' && process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SHEET_ID !== 'your_google_sheet_id_here' ? {
      googleSheet: [
        {
          path: '/plant/:id',
          component: './src/templates/googleSheet.vue',
        },
      ],
    } : {}),
  },
  transformers: {
    remark: {
      plugins: ['@gridsome/remark-prismjs'],
    },
  },

}
