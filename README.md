# 🌱 ACMG Quarry Lakes Demonstration Garden

[![Built with Vue.js](https://img.shields.io/badge/Vue.js-2.6.4-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Powered by Gridsome](https://img.shields.io/badge/Gridsome-0.7.0-00A672?style=flat-square)](https://gridsome.org/)
[![Yarn 4](https://img.shields.io/badge/Yarn-4.9.1-2C8EBB?style=flat-square&logo=yarn)](https://yarnpkg.com/)
[![Material Design](https://img.shields.io/badge/Material_Design-Vuetify-1976D2?style=flat-square&logo=material-design)](https://vuetifyjs.com/)

> A comprehensive digital plant catalog showcasing the botanical diversity of UC Davis's Quarry Lakes Demonstration Garden in Fremont, California.

**🌐 Live Site**: [https://hisgarden.dev/ACMG_QL](https://hisgarden.dev/ACMG_QL)

---

## ✨ What Makes This Special

The ACMG Quarry Lakes Demonstration Garden website is more than just a plant catalog—it's a gateway to sustainable Bay Area gardening. Built with modern web technologies, this platform showcases 200+ native and adapted plants thriving in our unique Mediterranean climate.

### 🎯 Our Mission
*To provide an accessible, searchable digital catalog of native and adapted plants thriving in the San Francisco Bay Area climate, promoting sustainable gardening practices and environmental stewardship.*

---

## 🚀 Features That Bloom

| Feature | Description |
|---------|-------------|
| 🔍 **Smart Search** | Real-time search across plant names, characteristics, and care requirements |
| 🏷️ **Garden Categories** | Native, Mediterranean, Grasses, Sensory, and OPAC collections |
| 📱 **Mobile-First** | Responsive design that works beautifully on any device |
| 🔄 **Live Data** | Dynamic integration with Google Sheets for instant updates |
| ⚡ **Lightning Fast** | Static site generation for optimal performance |
| 🧪 **Thoroughly Tested** | Comprehensive link validation and build verification |

---

## 🌿 Garden Collections

### 🏜️ [Native Plants](/natives)
California natives showcasing regional biodiversity with minimal water needs and maximum wildlife habitat value.

### 🌊 [Mediterranean Plants](/mediterranean)
Species from Mediterranean climates worldwide, perfectly adapted to our dry summers and mild winters.

### 🌾 [Grasses](/grasses)
Ornamental and native grasses providing texture, movement, and year-round interest.

### 👃 [Sensory Garden](/sensory)
Plants selected for their tactile, aromatic, and visual qualities—designed for universal accessibility.

### ⭐ [Outstanding Plants of Alameda County (OPAC)](/opac)
UC Master Gardener endorsed plants with proven excellence in our local climate.

---

## 🛠️ Quick Start

### Prerequisites
- **Node.js** 18.x or later
- **Yarn** 4.x (this project uses Yarn 4.9.1)
- **macOS users**: Xcode Command Line Tools and `vips` library

### Installation

```bash
# Clone the repository
git clone https://github.com/hisgarden/ACMG_QL.git
cd ACMG_QL

# Install Yarn 4.x globally (if needed)
npm install -g yarn@4

# Install system dependencies (macOS)
xcode-select --install
brew install vips

# Install project dependencies
yarn install

# Set up environment variables
cp .env.example .env
# Edit .env with your Google Sheets API credentials
```

### Development

```bash
# Start development server with hot-reload
yarn develop

# Visit http://localhost:8080
# GraphQL explorer available at http://localhost:8080/___explore
```

### Production Build

```bash
# Build for production
yarn build

# Build with comprehensive testing
yarn build:test

# Validate all links
yarn test:links
```

---

## 🏗️ Technology Stack

Built with modern, proven technologies for reliability and performance:

| Component | Technology | Version |
|-----------|------------|---------|
| **Frontend Framework** | Vue.js with Gridsome | Vue 2.6.4, Gridsome 0.7.0 |
| **UI Framework** | Vuetify (Material Design) | 2.4.9 |
| **Data Source** | Google Sheets API | v4 |
| **Build System** | Yarn | 4.9.1 |
| **Deployment** | Static Site Generation | JAMstack |

---

## 📂 Project Structure

```
ACMG_QL/
├── 📁 src/
│   ├── 🧩 components/         # Vue components
│   │   ├── AllPlants.vue     # Main plant catalog
│   │   ├── Header.vue        # Navigation
│   │   └── ...               # Other components
│   ├── 📄 pages/             # Route pages
│   │   ├── Index.vue         # Homepage
│   │   ├── Natives.vue       # Native plants
│   │   └── ...               # Category pages
│   ├── 🎨 assets/img/        # Plant photographs (200+)
│   └── ⚙️ main.js            # App entry point
├── 📊 static/                # Static assets
├── 🏗️ dist/                  # Build output
├── ⚙️ gridsome.config.js     # Configuration
└── 📋 package.json           # Dependencies
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn develop` | Start development server with hot-reload |
| `yarn build` | Generate production static files |
| `yarn build:test` | Comprehensive build with testing pipeline |
| `yarn test:links` | Validate all internal and external links |
| `yarn lint` | Code quality and style checking |

---

## 🌐 Data Integration

### Google Sheets Configuration

The application seamlessly integrates with Google Sheets for dynamic plant data:

```javascript
// gridsome.config.js
{
  use: 'gridsome-source-google-sheets-v2',
  options: {
    apiKey: process.env.GOOGLE_API_KEY,
    spreadsheets: [{
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      sheets: [{
        sheetName: 'WebSiteList',
        collectionName: 'googleSheet'
      }]
    }]
  }
}
```

### Environment Setup

```bash
# .env file
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_API_KEY=your_google_api_key
```

---

## 🎨 Design Philosophy

### Mobile-First Responsive Design

| Device | Screen Width | Grid Columns |
|--------|-------------|--------------|
| 📱 Mobile | < 600px | 1 column |
| 📱 Tablet | 600-960px | 2 columns |
| 💻 Desktop | 960-1264px | 3 columns |
| 🖥️ Large Desktop | > 1264px | 4 columns |

### User Experience Features

- **🔍 Real-time Search**: Instant filtering as you type
- **🏷️ Smart Filtering**: Filter by water needs, light exposure, bloom season
- **💡 Visual Feedback**: Characteristic chips, hover effects, loading states
- **♿ Accessibility**: WCAG AA compliant with keyboard navigation

---

## 🧪 Quality Assurance

### Comprehensive Testing Suite

Our testing framework validates:

- ✅ **Static Pages** - All defined routes
- ✅ **Dynamic Plant Pages** - Generated from Google Sheets data
- ✅ **Navigation Links** - Menu and breadcrumb functionality
- ✅ **Internal Links** - Cross-references within content
- ✅ **Build Integrity** - Production build validation

```bash
# Run the full test suite
yarn test:links

# Output includes:
# - Console summary with pass/fail status
# - Detailed JSON report (link-test-results.json)
# - Broken link identification and recommendations
```

---

## 🚀 Deployment

### Recommended Hosting Platforms

| Platform | Benefits | Setup |
|----------|----------|-------|
| **Netlify** | Automatic builds, form handling, CDN | `netlify.toml` included |
| **Vercel** | Git integration, preview deployments | Zero-config deployment |
| **GitHub Pages** | Free hosting, GitHub integration | Static file serving |
| **AWS S3 + CloudFront** | Enterprise scale, custom domains | Manual configuration |

### Performance Optimizations

- 🖼️ **Image Optimization** - Automatic compression and format conversion
- ⚡ **Code Splitting** - Lazy loading of non-critical components
- 💾 **Aggressive Caching** - Optimized static asset delivery
- 🗜️ **Minification** - CSS and JavaScript optimization

---

## 🔮 Future Vision

### Planned Enhancements

- 🎨 **Advanced Search** - Filter by botanical characteristics, growing conditions
- 👤 **User Collections** - Save favorite plants and create custom lists
- 📱 **PWA Features** - Offline functionality and mobile app experience
- 🎥 **Rich Media** - Plant care videos and seasonal guides
- 🤝 **Community Features** - User reviews and plant care sharing

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Clone** your fork locally
3. **Install** dependencies with `yarn install`
4. **Create** a feature branch
5. **Make** your changes and test thoroughly
6. **Run** `yarn test:links` before committing
7. **Submit** a pull request

### Code Standards

- 📝 **Vue.js Conventions** - Single File Components, proper prop validation
- 🎨 **Styling** - Vuetify classes preferred, mobile-first responsive design
- ♿ **Accessibility** - WCAG AA compliance, semantic HTML
- 📚 **Documentation** - Comment complex logic, update README

---

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

---

## 🙏 Acknowledgments

- **UC Davis Arboretum and Community Gardens** - Project sponsor and plant expertise
- **Quarry Lakes Regional Recreation Area** - Demonstration garden location
- **UC Master Gardeners of Alameda County** - Plant selection and validation
- **Open Source Community** - Vue.js, Gridsome, and all supporting technologies

---

<div align="center">

**🌱 Cultivating knowledge, one plant at a time 🌱**

*Built with ❤️ for sustainable Bay Area gardening*

[Report Issues](https://github.com/hisgarden/ACMG_QL/issues) • [Request Features](https://github.com/hisgarden/ACMG_QL/discussions) • [View Documentation](ACMG_QL_Documentation.adoc)

</div>