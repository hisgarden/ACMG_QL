const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const BASE_URL = 'http://localhost:8080';
const OUTPUT_DIR = './dist';
const TEST_RESULTS_FILE = './link-test-results.json';

// Test results storage
let testResults = {
  timestamp: new Date().toISOString(),
  summary: {
    total: 0,
    passed: 0,
    failed: 0
  },
  tests: [],
  brokenLinks: [],
  recommendations: []
};

// Helper function to make HTTP requests
async function checkUrl(url) {
  try {
    const response = await fetch(url);
    return {
      url,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      url,
      status: 0,
      ok: false,
      error: error.message
    };
  }
}

// Test static pages
const STATIC_PAGES = [
  '/',
  '/about',
  '/contact',
  '/opac',
  '/Natives',
  '/Mediterranean', 
  '/Grasses',
  '/Sensory'
];

// Test navigation menu links
const NAVIGATION_LINKS = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Outstanding Plants of Alameda County', path: '/opac' },
  { title: 'Native Plants', path: '/Natives' },
  { title: 'Mediterranean Plants', path: '/Mediterranean' },
  { title: 'Grasses Plants', path: '/Grasses' },
  { title: 'Sensory Plants', path: '/Sensory' },
  { title: 'Contact', path: '/contact' }
];

// Function to get all plant IDs from GraphQL
async function getPlantIds() {
  try {
    const query = `
      query {
        allGoogleSheet {
          edges {
            node {
              id
              ID
              Common_Name
              Scientific_Name
            }
          }
        }
      }
    `;
    
    // Try the GraphQL endpoint first
    let response = await fetch(`${BASE_URL}/___graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });
    
    // If that fails, try the explore endpoint
    if (!response.ok) {
      response = await fetch(`${BASE_URL}/___explore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });
    }
    
    if (!response.ok) {
      throw new Error(`GraphQL query failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.data || !data.data.allGoogleSheet) {
      console.log('No plant data found in GraphQL response');
      return [];
    }
    
    return data.data.allGoogleSheet.edges.map(edge => ({
      id: edge.node.id,
      originalId: edge.node.ID,
      commonName: edge.node.Common_Name,
      scientificName: edge.node.Scientific_Name
    }));
  } catch (error) {
    console.error('Failed to fetch plant IDs:', error);
    return [];
  }
}

// Test function for static pages
async function testStaticPages() {
  console.log('Testing static pages...');
  
  for (const page of STATIC_PAGES) {
    const url = `${BASE_URL}${page}`;
    const result = await checkUrl(url);
    
    testResults.tests.push({
      type: 'static_page',
      url,
      ...result
    });
    
    testResults.summary.total++;
    
    if (result.ok) {
      testResults.summary.passed++;
      console.log(`✅ ${url} - OK`);
    } else {
      testResults.summary.failed++;
      testResults.brokenLinks.push({
        url,
        type: 'static_page',
        status: result.status,
        error: result.error || result.statusText
      });
      console.log(`❌ ${url} - ${result.status} ${result.statusText || result.error}`);
    }
  }
}

// Test function for navigation links
async function testNavigationLinks() {
  console.log('Testing navigation links...');
  
  for (const link of NAVIGATION_LINKS) {
    const url = `${BASE_URL}${link.path}`;
    const result = await checkUrl(url);
    
    testResults.tests.push({
      type: 'navigation_link',
      title: link.title,
      url,
      ...result
    });
    
    testResults.summary.total++;
    
    if (result.ok) {
      testResults.summary.passed++;
      console.log(`✅ Navigation: ${link.title} (${url}) - OK`);
    } else {
      testResults.summary.failed++;
      testResults.brokenLinks.push({
        url,
        type: 'navigation_link',
        title: link.title,
        status: result.status,
        error: result.error || result.statusText
      });
      console.log(`❌ Navigation: ${link.title} (${url}) - ${result.status} ${result.statusText || result.error}`);
    }
  }
}

// Test function for dynamic plant pages
async function testPlantPages() {
  console.log('Testing dynamic plant pages...');
  
  const plants = await getPlantIds();
  
  if (plants.length === 0) {
    console.log('⚠️ No plant data found. Make sure the development server is running.');
    return;
  }
  
  console.log(`Found ${plants.length} plants to test`);
  
  for (const plant of plants) {
    const url = `${BASE_URL}/plant/${plant.id}`;
    const result = await checkUrl(url);
    
    testResults.tests.push({
      type: 'plant_page',
      plantId: plant.id,
      originalId: plant.originalId,
      commonName: plant.commonName,
      scientificName: plant.scientificName,
      url,
      ...result
    });
    
    testResults.summary.total++;
    
    if (result.ok) {
      testResults.summary.passed++;
      console.log(`✅ Plant: ${plant.commonName} (${url}) - OK`);
    } else {
      testResults.summary.failed++;
      testResults.brokenLinks.push({
        url,
        type: 'plant_page',
        plantId: plant.id,
        originalId: plant.originalId,
        commonName: plant.commonName,
        status: result.status,
        error: result.error || result.statusText
      });
      console.log(`❌ Plant: ${plant.commonName} (${url}) - ${result.status} ${result.statusText || result.error}`);
    }
  }
}

// Test function for Additional Plant Info links
async function testAdditionalPlantInfoLinks() {
  console.log('Testing Additional Plant Info links...');
  
  const plants = await getPlantIds();
  
  if (plants.length === 0) {
    console.log('⚠️ No plant data found for Additional Plant Info testing.');
    return;
  }
  
  // Get detailed plant data including Plant_Info_Link
  const query = `
    query {
      allGoogleSheet {
        edges {
          node {
            id
            ID
            Common_Name
            Plant_Info_Link
          }
        }
      }
    }
  `;
  
  let response = await fetch(`${BASE_URL}/___graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query })
  });
  
  if (!response.ok) {
    response = await fetch(`${BASE_URL}/___explore`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });
  }
  
  if (!response.ok) {
    console.log('❌ Failed to fetch plant data for Additional Plant Info testing');
    return;
  }
  
  const data = await response.json();
  const plantsWithInfo = data.data.allGoogleSheet.edges;
  
  let plantsWithValidLinks = 0;
  let plantsWithEmptyLinks = 0;
  let brokenAdditionalLinks = 0;
  
  for (const plantEdge of plantsWithInfo) {
    const plant = plantEdge.node;
    const hasValidLink = plant.Plant_Info_Link && plant.Plant_Info_Link.trim() !== '';
    
    if (hasValidLink) {
      plantsWithValidLinks++;
      // Test the actual link
      const result = await checkUrl(plant.Plant_Info_Link);
      
      testResults.tests.push({
        type: 'additional_plant_info_link',
        plantId: plant.id,
        originalId: plant.ID,
        commonName: plant.Common_Name,
        url: plant.Plant_Info_Link,
        ...result
      });
      
      testResults.summary.total++;
      
      if (result.ok) {
        testResults.summary.passed++;
        console.log(`✅ Additional Info: ${plant.Common_Name} (${plant.Plant_Info_Link}) - OK`);
      } else {
        testResults.summary.failed++;
        brokenAdditionalLinks++;
        testResults.brokenLinks.push({
          url: plant.Plant_Info_Link,
          type: 'additional_plant_info_link',
          plantId: plant.id,
          originalId: plant.ID,
          commonName: plant.Common_Name,
          status: result.status,
          error: result.error || result.statusText
        });
        console.log(`❌ Additional Info: ${plant.Common_Name} (${plant.Plant_Info_Link}) - ${result.status} ${result.statusText || result.error}`);
      }
    } else {
      plantsWithEmptyLinks++;
      console.log(`ℹ️ No Additional Info link: ${plant.Common_Name} (expected - link is hidden)`);
    }
  }
  
  console.log(`\n📊 Additional Plant Info Links Summary:`);
  console.log(`Plants with valid links: ${plantsWithValidLinks}`);
  console.log(`Plants with empty/hidden links: ${plantsWithEmptyLinks}`);
  console.log(`Broken additional info links: ${brokenAdditionalLinks}`);
}

// Test function for internal links within pages
async function testInternalLinks() {
  console.log('Testing internal links within pages...');
  
  // Test links from the home page
  try {
    const homeResponse = await fetch(`${BASE_URL}/`);
    const homeHtml = await homeResponse.text();
    
    // Extract all internal links (simplified regex)
    const linkRegex = /href="(\/[^"]*?)"/g;
    const links = [];
    let match;
    
    while ((match = linkRegex.exec(homeHtml)) !== null) {
      const link = match[1];
      if (!links.includes(link)) {
        links.push(link);
      }
    }
    
    console.log(`Found ${links.length} internal links on home page`);
    
    for (const link of links) {
      const url = `${BASE_URL}${link}`;
      const result = await checkUrl(url);
      
      testResults.tests.push({
        type: 'internal_link',
        url,
        foundOn: 'home_page',
        ...result
      });
      
      testResults.summary.total++;
      
      if (result.ok) {
        testResults.summary.passed++;
      } else {
        testResults.summary.failed++;
        testResults.brokenLinks.push({
          url,
          type: 'internal_link',
          foundOn: 'home_page',
          status: result.status,
          error: result.error || result.statusText
        });
      }
    }
  } catch (error) {
    console.error('Failed to test internal links:', error);
  }
}

// Generate recommendations based on test results
function generateRecommendations() {
  const recommendations = [];
  
  // Check for missing static pages
  const missingPages = testResults.brokenLinks.filter(link => 
    link.type === 'static_page' && link.status === 404
  );
  
  if (missingPages.length > 0) {
    recommendations.push({
      type: 'missing_pages',
      severity: 'high',
      message: 'Create missing static pages',
      details: missingPages.map(page => ({
        path: page.url.replace(BASE_URL, ''),
        action: `Create ${page.url.replace(BASE_URL, '').substring(1)}.vue in src/pages/`
      }))
    });
  }
  
  // Check for plant page issues
  const plantPageIssues = testResults.brokenLinks.filter(link => link.type === 'plant_page');
  
  if (plantPageIssues.length > 0) {
    recommendations.push({
      type: 'plant_page_issues',
      severity: 'high',
      message: 'Fix plant page routing issues',
      details: 'Plant pages are failing - check ID generation and template configuration'
    });
  }
  
  // Check for navigation issues
  const navIssues = testResults.brokenLinks.filter(link => link.type === 'navigation_link');
  
  if (navIssues.length > 0) {
    recommendations.push({
      type: 'navigation_issues',
      severity: 'medium',
      message: 'Fix navigation menu links',
      details: navIssues.map(issue => ({
        title: issue.title,
        path: issue.url.replace(BASE_URL, ''),
        status: issue.status
      }))
    });
  }
  
  testResults.recommendations = recommendations;
}

// Main test function
async function runAllTests() {
  console.log('🚀 Starting comprehensive link testing...\n');
  
  // Check if development server is running
  try {
    await checkUrl(BASE_URL);
    console.log(`✅ Development server is running at ${BASE_URL}\n`);
  } catch (error) {
    console.error(`❌ Development server is not running at ${BASE_URL}`);
    console.error('Please start the server with: yarn develop');
    process.exit(1);
  }
  
  // Run all tests
  await testStaticPages();
  console.log('');
  
  await testNavigationLinks();
  console.log('');
  
  await testPlantPages();
  console.log('');
  
  await testAdditionalPlantInfoLinks();
  console.log('');
  
  await testInternalLinks();
  console.log('');
  
  // Generate recommendations
  generateRecommendations();
  
  // Save results
  fs.writeFileSync(TEST_RESULTS_FILE, JSON.stringify(testResults, null, 2));
  
  // Print summary
  console.log('📊 TEST SUMMARY');
  console.log('================');
  console.log(`Total tests: ${testResults.summary.total}`);
  console.log(`Passed: ${testResults.summary.passed}`);
  console.log(`Failed: ${testResults.summary.failed}`);
  console.log(`Success rate: ${((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1)}%`);
  
  if (testResults.brokenLinks.length > 0) {
    console.log('\n❌ BROKEN LINKS FOUND:');
    testResults.brokenLinks.forEach(link => {
      console.log(`- ${link.url} (${link.type}) - Status: ${link.status}`);
    });
  }
  
  if (testResults.recommendations.length > 0) {
    console.log('\n💡 RECOMMENDATIONS:');
    testResults.recommendations.forEach(rec => {
      console.log(`- [${rec.severity.toUpperCase()}] ${rec.message}`);
    });
  }
  
  console.log(`\n📄 Detailed results saved to: ${TEST_RESULTS_FILE}`);
  
  // Exit with error code if tests failed
  if (testResults.summary.failed > 0) {
    process.exit(1);
  }
}

// Add fetch polyfill for Node.js
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

// Run tests
runAllTests().catch(console.error); 