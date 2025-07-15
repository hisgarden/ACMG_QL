**Table of Contents:**

<hr />

# Build Instructions for macOS (2025)

## Prerequisites
- macOS (tested on Sonoma and later)
- Node.js 18.x or later (recommended)
- Yarn 4.x (this project uses Yarn 4.9.1)
- Xcode Command Line Tools
- Homebrew

## 1. Install Yarn 4.x (if not already installed)
```
npm install -g yarn@4
```

## 2. Install system dependencies
```
xcode-select --install
brew install vips
```

## 3. Install project dependencies
```
yarn install
```

## 4. Build the project
```
yarn build
```

The build should complete successfully and generate the static site in the `dist/` directory.

If you encounter errors related to native modules (like `sharp`), ensure you have the system dependencies above installed, and try a clean install:
```
rm -rf .yarn node_modules yarn.lock .pnp.cjs
yarn install
```

## Google Sheets Integration (Optional)

This project is configured to pull plant data from Google Sheets. To enable this feature:

1. Create a Google Cloud Project and enable the Google Sheets API
2. Create an API key with access to Google Sheets
3. Create or use an existing Google Sheet with plant data
4. Update the `.env` file with your credentials:
   ```
   GOOGLE_API_KEY=your_actual_google_api_key
   GOOGLE_SHEET_ID=your_actual_google_sheet_id
   ```

The build will work without Google Sheets data, but plant pages will show a placeholder message.

# About the starter



Gridsome starter based on the minimal styling.  Content data is imported from Google Sheet using GraphQL. Vuetify CSS framework is used for styling

## Key features

- Built with Vuetify CSS
- Responsive
- GraphQL
- Author pages
- Tags
- Categories
- Dynamic custom pages


## Setup step-by-step guide

1.  Pick a general purpose code editor -- VS Code from Microsoft
1.  Set up a workspace in your home path
1.  Learn some Markdown language to be used for content data page
1.  Use Gridsome as front end static site generator
1.  Use a Gridsome starter kit to set up your project
1.  Learn how Git work, and how it keep track of your change to the data

### Pick a general purpose code editor

I recommend download VS Code from Microsoft

https://code.visualstudio.com/

### Set up a workspace in your home path

Create workspace folder under your home path

```
mkdir workspace

cd workspace
```

## Learn some Markdown language to be used for content data page

You may be familiar with Markdown if you are familar with [Python Jupyter](https://pythonawesome.com/jupyter-notebooks-as-markdown-documents/) notebooks

Learn Markdown in 30 minutes! Watch this https://www.youtube.com/watch?v=bTVIMt3XllM

## Use Gridsome as front end static site generator

Check out Gridsome awesome site feature: https://gridsome.org

### Install Gridsome

Use [YARN](https://yarnpkg.com) to install

```
yarn global add @gridsome/cli
```

### Build your site using the following command


```
cd workspace
gridsome create my-site https://github.com/hisgarden/gridsome-googlesheet

cd my-site

gridsome develop
```
Open your browser and type in:

[http://localhost:8080/](http://localhost:8080)


## Credits

This starter is based on:

[Gridsome Headless CMS Tutorial With Google Sheets](https://www.youtube.com/watch?v=-i6C9GE0oTA)


Happy coding 🎉🙌