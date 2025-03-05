#!/usr/bin/env node

const { execSync } = require('child_process');

// Get all staged files
const getStagedFiles = () => {
  try {
    const output = execSync(
      'git diff --cached --name-only --diff-filter=ACMR'
    ).toString();
    return output.split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error getting staged files:', error);
    return [];
  }
};

// Filter for Cypress test files
const getCypressTestFiles = (files) => {
  return files.filter(
    (file) =>
      (file.startsWith('cypress/e2e/') && file.endsWith('.cy.ts')) ||
      file.endsWith('.cy.js') ||
      file.endsWith('.cy.tsx') ||
      file.endsWith('.cy.jsx')
  );
};

// Run Cypress tests on the staged files
const runCypressTests = (testFiles) => {
  if (testFiles.length === 0) {
    console.log('No Cypress test files staged, skipping Cypress tests');
    return true;
  }

  console.log('Running Cypress tests on staged files:');
  testFiles.forEach((file) => console.log(`- ${file}`));

  try {
    // Run each test file individually
    for (const file of testFiles) {
      console.log(`\nRunning test: ${file}`);
      execSync(`npm run cypress:run-file "${file}"`, { stdio: 'inherit' });
    }
    console.log('\nAll Cypress tests passed!');
    return true;
  } catch (error) {
    console.error('\nCypress tests failed!');
    return false;
  }
};

// Main execution
const main = () => {
  const stagedFiles = getStagedFiles();
  const cypressTestFiles = getCypressTestFiles(stagedFiles);

  if (!runCypressTests(cypressTestFiles)) {
    process.exit(1);
  }
};

main();
