import { renameSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

const rootDir = process.cwd();
const apiPath = join(rootDir, 'src', 'app', 'api');
const backupPath = join(rootDir, 'src', 'api_backup');

let moved = false;

try {
  if (existsSync(apiPath)) {
    console.log('> Temporarily hiding API routes for static HTML export...');
    renameSync(apiPath, backupPath);
    moved = true;
  }

  console.log('> Running next build...');
  execSync('npx next build', { stdio: 'inherit' });
  console.log('> Build and static HTML export completed successfully in "./dist"!');

} catch (error) {
  console.error('> Build failed:', error.message);
  process.exitCode = 1;
} finally {
  if (moved && existsSync(backupPath)) {
    console.log('> Restoring API routes for local development...');
    renameSync(backupPath, apiPath);
  }
}
