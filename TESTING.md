# Comprehensive Link Testing System

This project includes a comprehensive link testing system to verify all links work correctly before deployment.

## Overview

The testing system checks:
- ✅ Static pages (Home, About, Contact, etc.)
- ✅ Navigation menu links
- ✅ Dynamic plant pages (generated from Google Sheets)
- ✅ Internal links within pages
- ✅ Build integrity

## Quick Start

### 1. Run Link Tests During Development

Make sure your development server is running:
```bash
yarn develop
```

Then run the link tests:
```bash
yarn test:links
```

### 2. Comprehensive Build with Testing

To run all tests and build for production:
```bash
yarn build:test
```

This will:
1. Check if development server is running
2. Run comprehensive link tests
3. Run code linting
4. Build for production
5. Test built files
6. Generate deployment report

## Test Scripts

### `yarn test:links`
Runs comprehensive link testing on the development server.

**What it tests:**
- All static pages defined in navigation
- Navigation menu links
- Dynamic plant pages from Google Sheets data
- Internal links found on pages

**Output:**
- Console summary with pass/fail status
- Detailed JSON report saved to `link-test-results.json`

### `yarn build:test`
Complete build pipeline with testing.

**Process:**
1. ✅ Development server check
2. ✅ Link validation
3. ✅ Code linting
4. ✅ Production build
5. ✅ File integrity check
6. ✅ Deployment report generation

## Test Results

### Console Output
```
🚀 Starting comprehensive link testing...

✅ Development server is running at http://localhost:8080

Testing static pages...
✅ http://localhost:8080/ - OK
✅ http://localhost:8080/about - OK
✅ http://localhost:8080/contact - OK
...

📊 TEST SUMMARY
================
Total tests: 45
Passed: 45
Failed: 0
Success rate: 100.0%
```

### JSON Reports

#### `link-test-results.json`
Detailed test results including:
- Individual test results
- Broken links with status codes
- Recommendations for fixes
- Timestamp and summary statistics

#### `deployment-report.json`
Build and deployment readiness report:
- Build success status
- Tests run
- Deployment readiness
- Notes and recommendations

## Fixing Common Issues

### 404 Errors on Plant Pages

**Problem:** Links like `/142` return 404 errors.

**Cause:** Components using wrong ID field for links.

**Solution:** ✅ Fixed in this update
- Changed from `page.node.ID` to `page.node.id` 
- Updated link format to `/plant/${page.node.id}`

### Missing Static Pages

**Problem:** Navigation links to non-existent pages.

**Solution:** ✅ Fixed in this update
- Created all missing pages:
  - `/opac` - Outstanding Plants of Alameda County
  - `/Natives` - Native Plants
  - `/Mediterranean` - Mediterranean Plants  
  - `/Sensory` - Sensory Plants

### GraphQL Query Issues

**Problem:** Unable to fetch plant data for testing.

**Solution:** ✅ Fixed in this update
- Updated GraphQL endpoint detection
- Added fallback endpoints
- Better error handling

## Integration with CI/CD

### Pre-build Testing
The `prebuild` script automatically runs link tests before building:

```json
{
  "scripts": {
    "prebuild": "yarn test:links",
    "build": "NODE_OPTIONS=--openssl-legacy-provider gridsome build"
  }
}
```

### GitHub Actions Example
```yaml
name: Build and Test
on: [push, pull_request]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: yarn install
      - run: yarn develop &
      - run: sleep 30  # Wait for dev server
      - run: yarn test:links:ci
      - run: yarn build
```

### Netlify Integration
Add to `netlify.toml`:
```toml
[build]
  command = "yarn build:test"
  publish = "dist"
```

## Customizing Tests

### Adding New Static Pages
Update the `STATIC_PAGES` array in `test-links.js`:

```javascript
const STATIC_PAGES = [
  '/',
  '/about',
  '/contact',
  '/your-new-page'  // Add here
];
```

### Adding Navigation Tests
Update the `NAVIGATION_LINKS` array:

```javascript
const NAVIGATION_LINKS = [
  { title: 'Your Page', path: '/your-new-page' }
];
```

### Custom Test Configuration
Modify these constants in `test-links.js`:

```javascript
const BASE_URL = 'http://localhost:8080';  // Dev server URL
const TEST_RESULTS_FILE = './link-test-results.json';  // Results file
```

## Troubleshooting

### Development Server Not Running
```
❌ Development server is not running at http://localhost:8080
Please start the server with: yarn develop
```

**Solution:** Start the development server first.

### GraphQL Endpoint Issues
```
Failed to fetch plant IDs: Error: GraphQL query failed
```

**Solutions:**
1. Ensure development server is fully loaded
2. Check Google Sheets API configuration
3. Verify environment variables are set

### Build Failures
```
❌ Production build failed
```

**Solutions:**
1. Check console output for specific errors
2. Ensure all dependencies are installed
3. Verify Node.js version compatibility

## Best Practices

### Before Every Deployment
1. ✅ Run `yarn test:links` to verify all links
2. ✅ Run `yarn build:test` for full validation
3. ✅ Review test reports for any issues
4. ✅ Check deployment report before publishing

### During Development
- Run link tests after adding new pages
- Test after modifying navigation structure
- Verify dynamic routes after data changes

### For Team Collaboration
- Include test results in pull requests
- Set up CI/CD to run tests automatically
- Document any test failures and fixes

## File Structure

```
project/
├── test-links.js           # Main testing script
├── build-and-test.js       # Comprehensive build script
├── link-test-results.json  # Generated test results
├── deployment-report.json  # Generated deployment report
├── TESTING.md             # This documentation
└── package.json           # Scripts configuration
```

## Support

If you encounter issues with the testing system:

1. Check this documentation first
2. Review the console output for specific errors
3. Check the generated JSON reports for details
4. Ensure all dependencies are installed correctly

The testing system is designed to catch issues early and ensure a reliable deployment process. 