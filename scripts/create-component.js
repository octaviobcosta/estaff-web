#!/usr/bin/env node

const prompts = require('prompts');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const config = require('./component-config.json');

// Colors for CLI output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Validation functions
function validateComponentName(name) {
  if (!name) return 'Component name is required';
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
    return 'Component name must be PascalCase (start with uppercase letter)';
  }
  if (name.length < 2) return 'Component name must be at least 2 characters';
  if (name.length > 50) return 'Component name must be less than 50 characters';
  return true;
}

function componentExists(componentName, componentType) {
  const componentPath = path.join(
    process.cwd(),
    config.componentTypes[componentType].path,
    componentName
  );
  return fs.existsSync(componentPath);
}

// Template helpers
handlebars.registerHelper('join', function(array, separator = ', ') {
  return array.join(separator);
});

handlebars.registerHelper('capitalize', function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

handlebars.registerHelper('camelCase', function(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
});

handlebars.registerHelper('kebabCase', function(str) {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`).replace(/^-/, '');
});

handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

handlebars.registerHelper('includes', function(array, item, options) {
  return array.includes(item) ? options.fn(this) : options.inverse(this);
});

// Get component type from command line args
function getComponentTypeFromArgs() {
  const args = process.argv.slice(2);
  const typeFlag = args.find(arg => arg.startsWith('--type='));
  if (typeFlag) {
    return typeFlag.split('=')[1];
  }
  
  // Check for shortcuts
  if (args.includes('--primitive')) return 'primitive';
  if (args.includes('--element')) return 'element';
  if (args.includes('--pattern')) return 'pattern';
  
  return null;
}

// Main CLI function
async function createComponent() {
  log('\n🧩 Component Generator', 'bright');
  log('Creating components with design system integration\n', 'cyan');

  try {
    // Get component type from args or prompt
    let componentType = getComponentTypeFromArgs();
    
    if (!componentType) {
      const typeResponse = await prompts({
        type: 'select',
        name: 'type',
        message: 'What type of component do you want to create?',
        choices: Object.entries(config.componentTypes).map(([key, value]) => ({
          title: `${key.charAt(0).toUpperCase() + key.slice(1)} - ${value.description}`,
          description: `Examples: ${value.examples.join(', ')}`,
          value: key,
        })),
        initial: 0,
      });

      if (!typeResponse.type) {
        logError('Component type is required');
        process.exit(1);
      }
      componentType = typeResponse.type;
    }

    // Get component name
    const nameResponse = await prompts({
      type: 'text',
      name: 'name',
      message: 'Component name (PascalCase):',
      validate: validateComponentName,
    });

    if (!nameResponse.name) {
      logError('Component name is required');
      process.exit(1);
    }

    const componentName = nameResponse.name;

    // Check if component already exists
    if (componentExists(componentName, componentType)) {
      const overwriteResponse = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `Component "${componentName}" already exists. Overwrite?`,
        initial: false,
      });

      if (!overwriteResponse.overwrite) {
        logInfo('Operation cancelled');
        process.exit(0);
      }
    }

    // Get variants
    const variantChoices = [
      ...Object.keys(config.variants.common),
      ...(config.variants[componentName.toLowerCase()] || [])
    ].map(variant => ({
      title: variant,
      value: variant,
      selected: ['primary', 'secondary'].includes(variant)
    }));

    const variantResponse = await prompts({
      type: 'multiselect',
      name: 'variants',
      message: 'Select variants:',
      choices: variantChoices,
      min: 1,
    });

    // Get sizes
    const sizeResponse = await prompts({
      type: 'multiselect', 
      name: 'sizes',
      message: 'Select sizes:',
      choices: config.sizes.common.map(size => ({
        title: size,
        value: size,
        selected: ['sm', 'md', 'lg'].includes(size)
      })),
      min: 1,
    });

    // Animation options
    const animationResponse = await prompts({
      type: 'confirm',
      name: 'includeAnimations',
      message: 'Include animations?',
      initial: config.defaultProps[componentType].animations,
    });

    // File generation options
    const fileOptionsResponse = await prompts([
      {
        type: 'confirm',
        name: 'includeStories',
        message: 'Generate Storybook stories?',
        initial: true,
      },
      {
        type: 'confirm', 
        name: 'includeTests',
        message: 'Generate test files?',
        initial: true,
      },
      {
        type: 'confirm',
        name: 'includeIndex',
        message: 'Generate index.ts barrel export?',
        initial: true,
      }
    ]);

    // Prepare template data
    const templateData = {
      componentName,
      componentType,
      variants: variantResponse.variants || ['primary'],
      sizes: sizeResponse.sizes || ['md'],
      includeAnimations: animationResponse.includeAnimations,
      ...fileOptionsResponse,
      config: config,
      timestamp: new Date().toISOString(),
      author: 'Component Generator',
    };

    // Generate files
    await generateComponent(templateData);

    logSuccess('\nComponent generation completed! 🎉');
    log('\nGenerated files:', 'bright');
    
    const basePath = path.join(config.componentTypes[componentType].path, componentName);
    log(`  📄 ${basePath}/${componentName}.tsx`, 'green');
    
    if (fileOptionsResponse.includeStories) {
      log(`  📖 ${basePath}/${componentName}.stories.tsx`, 'green');
    }
    
    if (fileOptionsResponse.includeTests) {
      log(`  🧪 ${basePath}/${componentName}.test.tsx`, 'green');
    }
    
    if (fileOptionsResponse.includeIndex) {
      log(`  📦 ${basePath}/index.ts`, 'green');
    }

    log('\nNext steps:', 'bright');
    log('1. Import and use your component', 'cyan');
    log('2. Customize styles and behavior as needed', 'cyan');
    log('3. Run tests and stories to verify functionality', 'cyan');

  } catch (error) {
    if (error.name === 'PromptsCancelledError') {
      logInfo('\nOperation cancelled by user');
      process.exit(0);
    }
    
    logError(`Error: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

async function generateComponent(data) {
  const { componentName, componentType } = data;
  const componentDir = path.join(
    process.cwd(),
    config.componentTypes[componentType].path,
    componentName
  );

  // Create component directory
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // Generate component file
  await generateFile('component.hbs', `${componentName}.tsx`, componentDir, data);

  // Generate optional files
  if (data.includeStories) {
    await generateFile('story.hbs', `${componentName}.stories.tsx`, componentDir, data);
  }

  if (data.includeTests) {
    await generateFile('test.hbs', `${componentName}.test.tsx`, componentDir, data);
  }

  if (data.includeIndex) {
    await generateFile('index.hbs', 'index.ts', componentDir, data);
  }
}

async function generateFile(templateName, fileName, outputDir, data) {
  const templatePath = path.join(__dirname, 'templates', templateName);
  
  if (!fs.existsSync(templatePath)) {
    logError(`Template file not found: ${templatePath}`);
    return;
  }

  const templateContent = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(templateContent);
  const generatedContent = template(data);

  const outputPath = path.join(outputDir, fileName);
  fs.writeFileSync(outputPath, generatedContent);
  
  logInfo(`Generated: ${path.relative(process.cwd(), outputPath)}`);
}

// Handle process termination
process.on('SIGINT', () => {
  log('\n\nOperation cancelled by user', 'yellow');
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  logError('Unhandled promise rejection:');
  console.error(reason);
  process.exit(1);
});

// Run the CLI
if (require.main === module) {
  createComponent();
}

module.exports = { createComponent, validateComponentName, componentExists };