#!/usr/bin/env node

/**
 * Test script for the component generator CLI
 * Validates that all templates and configuration work correctly
 */

const fs = require('fs');
const path = require('path');
const { createComponent, validateComponentName, componentExists } = require('./create-component');

// Test configuration
const testCases = [
  {
    name: 'TestButton',
    type: 'primitive',
    variants: ['primary', 'secondary'],
    sizes: ['sm', 'md', 'lg'],
    includeAnimations: true,
    includeStories: true,
    includeTests: true,
    includeIndex: true,
  },
  {
    name: 'TestCard',
    type: 'element', 
    variants: ['default', 'elevated'],
    sizes: ['md', 'lg'],
    includeAnimations: true,
    includeStories: true,
    includeTests: true,
    includeIndex: true,
  }
];

function log(message, color = '\x1b[0m') {
  console.log(`${color}${message}\x1b[0m`);
}

function logSuccess(message) {
  log(`✅ ${message}`, '\x1b[32m');
}

function logError(message) {
  log(`❌ ${message}`, '\x1b[31m');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, '\x1b[36m');
}

async function testValidation() {
  logInfo('Testing validation functions...');
  
  // Test component name validation
  const validNames = ['Button', 'TestComponent', 'MyAwesomeWidget'];
  const invalidNames = ['button', '123Button', 'test-component', '', 'a'];
  
  for (const name of validNames) {
    const result = validateComponentName(name);
    if (result === true) {
      logSuccess(`Valid name: "${name}"`);
    } else {
      logError(`Expected "${name}" to be valid, but got: ${result}`);
    }
  }
  
  for (const name of invalidNames) {
    const result = validateComponentName(name);
    if (result !== true) {
      logSuccess(`Invalid name correctly rejected: "${name}" - ${result}`);
    } else {
      logError(`Expected "${name}" to be invalid, but was accepted`);
    }
  }
}

async function testTemplates() {
  logInfo('Testing template files exist...');
  
  const templateDir = path.join(__dirname, 'templates');
  const requiredTemplates = ['component.hbs', 'story.hbs', 'test.hbs', 'index.hbs'];
  
  for (const template of requiredTemplates) {
    const templatePath = path.join(templateDir, template);
    if (fs.existsSync(templatePath)) {
      logSuccess(`Template found: ${template}`);
    } else {
      logError(`Template missing: ${template}`);
    }
  }
}

async function testConfiguration() {
  logInfo('Testing configuration file...');
  
  try {
    const config = require('./component-config.json');
    
    // Check required configuration sections
    const requiredSections = ['componentTypes', 'variants', 'sizes', 'designTokens'];
    for (const section of requiredSections) {
      if (config[section]) {
        logSuccess(`Configuration section found: ${section}`);
      } else {
        logError(`Configuration section missing: ${section}`);
      }
    }
    
    // Check component types
    const requiredTypes = ['primitive', 'element', 'pattern'];
    for (const type of requiredTypes) {
      if (config.componentTypes[type]) {
        logSuccess(`Component type configured: ${type}`);
        
        // Check if directory path exists in config
        const dirPath = config.componentTypes[type].path;
        if (dirPath) {
          logSuccess(`Directory path configured for ${type}: ${dirPath}`);
        }
      } else {
        logError(`Component type missing: ${type}`);
      }
    }
    
  } catch (error) {
    logError(`Error loading configuration: ${error.message}`);
  }
}

async function testDirectoryStructure() {
  logInfo('Testing directory structure...');
  
  const config = require('./component-config.json');
  const baseDir = process.cwd();
  
  for (const [type, typeConfig] of Object.entries(config.componentTypes)) {
    const dirPath = path.join(baseDir, typeConfig.path);
    
    if (fs.existsSync(dirPath)) {
      logSuccess(`Directory exists: ${typeConfig.path}`);
    } else {
      logError(`Directory missing: ${typeConfig.path}`);
      
      // Try to create it
      try {
        fs.mkdirSync(dirPath, { recursive: true });
        logSuccess(`Created directory: ${typeConfig.path}`);
      } catch (error) {
        logError(`Failed to create directory: ${error.message}`);
      }
    }
  }
}

async function testComponentGeneration() {
  logInfo('Testing component generation...');
  
  // For this test, we'll simulate the data that would come from prompts
  // without actually running the interactive CLI
  
  const testData = {
    componentName: 'TestGeneratedComponent',
    componentType: 'element',
    variants: ['primary', 'secondary'],
    sizes: ['sm', 'md', 'lg'],
    includeAnimations: true,
    includeStories: true,
    includeTests: true,
    includeIndex: true,
    config: require('./component-config.json'),
    timestamp: new Date().toISOString(),
    author: 'Test Script',
  };
  
  try {
    // We can't easily test the full generation without mocking prompts,
    // but we can test that the functions exist and the templates compile
    const handlebars = require('handlebars');
    const templatePath = path.join(__dirname, 'templates', 'component.hbs');
    
    if (fs.existsSync(templatePath)) {
      const templateContent = fs.readFileSync(templatePath, 'utf8');
      const template = handlebars.compile(templateContent);
      const result = template(testData);
      
      if (result && result.length > 0) {
        logSuccess('Component template compiles successfully');
        logInfo(`Generated ${result.length} characters of component code`);
      } else {
        logError('Component template compiled but produced no output');
      }
    } else {
      logError('Component template file not found');
    }
    
  } catch (error) {
    logError(`Error testing component generation: ${error.message}`);
  }
}

async function testPackageScripts() {
  logInfo('Testing package.json scripts...');
  
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    const requiredScripts = [
      'create:component',
      'create:primitive', 
      'create:element',
      'create:pattern'
    ];
    
    for (const script of requiredScripts) {
      if (packageJson.scripts && packageJson.scripts[script]) {
        logSuccess(`NPM script found: ${script}`);
      } else {
        logError(`NPM script missing: ${script}`);
      }
    }
    
  } catch (error) {
    logError(`Error checking package.json: ${error.message}`);
  }
}

async function runAllTests() {
  console.log('\n🧪 Component Generator CLI Test Suite');
  console.log('=====================================\n');
  
  await testValidation();
  console.log('');
  
  await testTemplates();
  console.log('');
  
  await testConfiguration();
  console.log('');
  
  await testDirectoryStructure();
  console.log('');
  
  await testComponentGeneration();
  console.log('');
  
  await testPackageScripts();
  console.log('');
  
  logInfo('Test suite completed! 🎉');
  logInfo('If all tests passed, your CLI is ready to use.');
  logInfo('Try running: npm run create:component');
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = { runAllTests };