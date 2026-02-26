# SvelteKit Starter Project

This is a starter project for learning web development with **SvelteKit** and **TypeScript**.

## Getting Started

After cloning this repository, follow these steps:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   - Navigate to `http://localhost:5173` (or the URL shown in your terminal)
   - The page will automatically reload when you make changes to your code

## Verifying Your Code

Before committing your changes, you should check that your code is good:

1. **Check for TypeScript and Svelte errors**
   ```bash
   npm run check
   ```
   This checks your TypeScript code and Svelte components for errors.

2. **Check for code style issues (linting)**
   ```bash
   npm run lint
   ```
   This checks if your code follows best practices and coding standards.

3. **Format your code automatically**
   ```bash
   npm run format
   ```
   This automatically formats your code to make it consistent and readable.

**Tip:** Run all three commands before committing your code to ensure everything is in good shape!

## Building for Production

When you're ready to create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

Here's what each folder contains:

### 📁 `src/`
This is where all your application code lives.

- **`src/routes/`** - Your application pages and routes
  - Each `.svelte` file in this folder becomes a page
  - `+page.svelte` files are the actual pages
  - `+layout.svelte` files wrap pages with common elements (like headers/footers)

- **`src/lib/`** - Reusable components and utilities
  - Put your custom Svelte components here
  - You can import from this folder using `$lib/...`

- **`src/app.html`** - The HTML template for your entire app
  - This is the base HTML structure
  - Usually you don't need to change this often

### 📁 `static/`
Files that should be served as-is (images, fonts, favicon, etc.)
- Files here are accessible at the root URL
- Example: `static/favicon.svg` → `http://localhost:5173/favicon.svg`

### 📁 `.svelte-kit/`
Generated files by SvelteKit (created automatically)
- Don't edit files in here
- This folder is not committed to git

## Important Files (What You'll Change Most Often)

### For Beginners, Focus on These Files:

1. **`src/routes/+page.svelte`**
   - This is your home page
   - Start editing here to see changes in your browser
   - Write HTML, CSS, and TypeScript all in one file

2. **`src/routes/+layout.svelte`**
   - This wraps all your pages
   - Good place for navigation, headers, or footers that appear on every page

3. **`src/lib/` folder**
   - Create reusable components here
   - Example: `src/lib/Button.svelte`, `src/lib/Card.svelte`

4. **`static/` folder**
   - Add images, fonts, or other static files here

### Configuration Files (Less Frequently Changed)

**Do not change these files unless you know what you are doing.**

- **`package.json`** - Lists your project dependencies and scripts
- **`svelte.config.js`** - SvelteKit configuration
- **`vite.config.ts`** - Vite (build tool) configuration
- **`tsconfig.json`** - TypeScript configuration
- **`eslint.config.js`** - Code linting rules

Happy coding! 🚀
