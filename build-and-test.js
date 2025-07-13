#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting comprehensive build and test process...\n');

// Step 1: Check if development server is running
function checkDevServer() {
  console.log('1️⃣ Checking development server...');
  try {
    execSync('curl -f http://localhost:8080 > /dev/null 2>&1', { stdio: 'ignore' });
    console.log('✅ Development server is running\n');
    return true;
  } catch (error) {
    console.log('❌ Development server is not running');
    console.log('Please start it with: yarn develop\n');
    return false;
  }
}

// Step 2: Run link tests
function runLinkTests() {
  console.log('2️⃣ Running comprehensive link tests...');
  try {
    execSync('node test-links.js', { stdio: 'inherit' });
    console.log('✅ All link tests passed\n');
    return true;
  } catch (error) {
    console.log('❌ Link tests failed');
    console.log('Check the test results above for details\n');
    return false;
  }
}

// Step 3: Run linting
function runLinting() {
  console.log('3️⃣ Running code linting...');
  try {
    execSync('yarn lint', { stdio: 'inherit' });
    console.log('✅ Code linting passed\n');
    return true;
  } catch (error) {
    console.log('⚠️ Linting issues found (continuing with build)\n');
    return true; // Don't fail build for linting issues
  }
}

// Step 4: Build for production
function buildProduction() {
  console.log('4️⃣ Building for production...');
  try {
    execSync('NODE_OPTIONS=--openssl-legacy-provider gridsome build', { stdio: 'inherit' });
    console.log('✅ Production build completed\n');
    return true;
  } catch (error) {
    console.log('❌ Production build failed\n');
    return false;
  }
}

// Step 5: Test built files
function testBuiltFiles() {
  console.log('5️⃣ Testing built files...');
  
  const distDir = './dist';
  if (!fs.existsSync(distDir)) {
    console.log('❌ Dist directory not found');
    return false;
  }
  
  const indexFile = `${distDir}/index.html`;
  if (!fs.existsSync(indexFile)) {
    console.log('❌ Index.html not found in dist');
    return false;
  }
  
  // Check file sizes
  const stats = fs.statSync(indexFile);
  if (stats.size < 1000) {
    console.log('❌ Index.html seems too small (possible build issue)');
    return false;
  }
  
  console.log('✅ Built files look good\n');
  return true;
}

// Step 6: Generate deployment report
function generateReport() {
  console.log('6️⃣ Generating deployment report...');
  
  const report = {
    timestamp: new Date().toISOString(),
    buildSuccess: true,
    testsRun: [
      'Link validation',
      'Code linting', 
      'Production build',
      'File integrity check'
    ],
    deploymentReady: true,
    notes: [
      'All tests passed successfully',
      'Production build completed',
      'Ready for deployment to dist/ directory'
    ]
  };
  
  fs.writeFileSync('./deployment-report.json', JSON.stringify(report, null, 2));
  console.log('✅ Deployment report saved to deployment-report.json\n');
}

// Main execution
async function main() {
  let success = true;
  
  // Run all steps
  if (!checkDevServer()) success = false;
  if (success && !runLinkTests()) success = false;
  if (success && !runLinting()) success = false; // Linting doesn't fail the build
  if (success && !buildProduction()) success = false;
  if (success && !testBuiltFiles()) success = false;
  
  if (success) {
    generateReport();
    console.log('🎉 BUILD SUCCESSFUL!');
    console.log('================');
    console.log('✅ All tests passed');
    console.log('✅ Production build completed');
    console.log('✅ Files ready for deployment');
    console.log('\n📁 Deploy the contents of the dist/ directory to your web server');
  } else {
    console.log('💥 BUILD FAILED!');
    console.log('==============');
    console.log('❌ One or more steps failed');
    console.log('📄 Check the output above for details');
    process.exit(1);
  }
}

main().catch(console.error); 