#!/usr/bin/env node

/**
 * Rename .js files containing JSX syntax to .jsx
 *
 * This script scans the src directory for .js files that contain JSX
 * and renames them to .jsx for proper Vite/Rollup processing.
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');
const DRY_RUN = process.argv.includes('--dry-run');

// Patterns that indicate JSX usage
const JSX_PATTERNS = [
  /<[A-Z][a-zA-Z0-9]*/, // JSX component tags like <Component>
  /return\s*\(/,  // Likely returning JSX
  /className=/,   // JSX className attribute
  /\.map\(\s*\(/  // Often used with JSX
];

/**
 * Check if file contains JSX
 */
function containsJSX(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check for JSX patterns
    return JSX_PATTERNS.some(pattern => pattern.test(content));
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Recursively find all .js files
 */
function findJSFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and other non-source directories
      if (!['node_modules', 'dist', 'build', '.git'].includes(entry.name)) {
        findJSFiles(fullPath, files);
      }
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Update import statements in a file
 */
function updateImports(filePath, renamedFiles) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Update imports for renamed files
    for (const [oldPath, newPath] of Object.entries(renamedFiles)) {
      const oldName = path.basename(oldPath, '.js');
      const newName = path.basename(newPath, '.jsx');

      // Match import statements
      const importRegex = new RegExp(
        `(from\\s+['"].*/${oldName})(')`,
        'g'
      );

      if (importRegex.test(content)) {
        content = content.replace(importRegex, `$1.jsx$2`);
        modified = true;
      }

      // Also handle relative imports without extension
      const relativeRegex = new RegExp(
        `(from\\s+['"]\\.\\.?/[^'"]*/${oldName})(['"])`,
        'g'
      );

      if (relativeRegex.test(content)) {
        content = content.replace(relativeRegex, `$1.jsx$2`);
        modified = true;
      }
    }

    if (modified && !DRY_RUN) {
      fs.writeFileSync(filePath, content);
    }

    return modified;
  } catch (error) {
    console.error(`Error updating imports in ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Scanning for .js files with JSX...\n');

  if (DRY_RUN) {
    console.log('📋 DRY RUN MODE - No files will be modified\n');
  }

  // Find all .js files in src
  const jsFiles = findJSFiles(SRC_DIR);
  console.log(`Found ${jsFiles.length} .js files in src/\n`);

  // Identify files that need renaming
  const filesToRename = [];

  for (const file of jsFiles) {
    if (containsJSX(file)) {
      filesToRename.push(file);
    }
  }

  console.log(`Found ${filesToRename.length} .js files containing JSX:\n`);

  if (filesToRename.length === 0) {
    console.log('✅ No files need renaming!');
    return;
  }

  // Rename files
  const renamedFiles = {};

  for (const file of filesToRename) {
    const newFile = file.replace(/\.js$/, '.jsx');
    const relativePath = path.relative(SRC_DIR, file);

    console.log(`  ${relativePath} → ${path.basename(newFile)}`);

    if (!DRY_RUN) {
      fs.renameSync(file, newFile);
    }

    renamedFiles[file] = newFile;
  }

  console.log(`\n📝 Renamed ${Object.keys(renamedFiles).length} files\n`);

  // Update imports in all remaining files
  if (!DRY_RUN && Object.keys(renamedFiles).length > 0) {
    console.log('🔄 Updating import statements...\n');

    const allFiles = [
      ...findJSFiles(SRC_DIR),
      ...Object.values(renamedFiles),
    ];

    let updatedCount = 0;

    for (const file of allFiles) {
      if (updateImports(file, renamedFiles)) {
        updatedCount++;
      }
    }

    console.log(`✅ Updated imports in ${updatedCount} files\n`);
  }

  console.log('='.repeat(60));
  console.log('✅ Migration complete!');
  console.log('='.repeat(60));

  if (DRY_RUN) {
    console.log('\nRun without --dry-run to apply changes');
  }
}

// Run
if (require.main === module) {
  main();
}

module.exports = { main };
