#!/usr/bin/env node

/**
 * Build script for Static Site Generation
 *
 * This script orchestrates the full SSG build process:
 * 1. Build with Vite
 * 2. Start preview server
 * 3. Run prerendering
 * 4. Stop preview server
 * 5. Generate sitemap
 */

const { spawn } = require('child_process');
const { prerender } = require('./prerender.js');

const PREVIEW_PORT = 5000;

/**
 * Execute a command and return a promise
 */
function exec(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with code ${code}: ${command} ${args.join(' ')}`));
      } else {
        resolve();
      }
    });

    child.on('error', reject);
  });
}

/**
 * Start preview server and wait for it to be ready
 */
function startPreviewServer() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting preview server...\n');

    const server = spawn('npx', ['vite', 'preview', '--port', PREVIEW_PORT], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });

    let resolved = false;

    // Listen for server ready message
    server.stdout.on('data', (data) => {
      const output = data.toString();
      process.stdout.write(output);

      if (output.includes('localhost') && !resolved) {
        resolved = true;
        console.log('✓ Preview server ready\n');
        // Wait a bit more to ensure server is fully ready
        setTimeout(() => resolve(server), 1000);
      }
    });

    server.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    server.on('error', reject);

    server.on('close', (code) => {
      if (code !== 0 && !resolved) {
        reject(new Error(`Preview server failed with code ${code}`));
      }
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!resolved) {
        server.kill();
        reject(new Error('Preview server startup timeout'));
      }
    }, 30000);
  });
}

/**
 * Stop the preview server
 */
function stopPreviewServer(server) {
  return new Promise((resolve) => {
    console.log('\n🛑 Stopping preview server...');

    if (server && !server.killed) {
      server.on('close', () => {
        console.log('✓ Preview server stopped\n');
        resolve();
      });

      server.kill();

      // Force kill after 5 seconds
      setTimeout(() => {
        if (!server.killed) {
          server.kill('SIGKILL');
          resolve();
        }
      }, 5000);
    } else {
      resolve();
    }
  });
}

/**
 * Main build function
 */
async function build() {
  console.log('\n' + '='.repeat(60));
  console.log('🏗️  Building Static Site');
  console.log('='.repeat(60) + '\n');

  let server = null;

  try {
    // Step 1: Build with Vite
    console.log('📦 Step 1/4: Building with Vite...\n');
    await exec('npm', ['run', 'build-local']);
    console.log('\n✓ Vite build complete\n');

    // Step 2: Start preview server
    console.log('🌐 Step 2/4: Starting preview server...\n');
    server = await startPreviewServer();

    // Step 3: Prerender
    console.log('🎨 Step 3/4: Pre-rendering pages...\n');
    await prerender();

    // Step 4: Stop preview server
    console.log('🛑 Step 4/4: Cleanup...\n');
    await stopPreviewServer(server);
    server = null;

    // Success
    console.log('='.repeat(60));
    console.log('✅ Static Site Generation Complete!');
    console.log('='.repeat(60));
    console.log('\nOutput directory: dist/');
    console.log('Preview: npm run preview\n');

  } catch (error) {
    console.error('\n❌ Build failed:', error.message);

    // Cleanup
    if (server) {
      await stopPreviewServer(server);
    }

    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  build();
}

module.exports = { build };
