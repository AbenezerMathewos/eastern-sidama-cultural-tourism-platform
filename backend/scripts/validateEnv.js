/**
 * validateEnv.js
 * Validates that all required environment variables are set before the server starts.
 * Run this script at server startup to fail fast on misconfiguration.
 */

const REQUIRED_VARS = [
  'NODE_ENV',
  'PORT',
  'DATABASE',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'EMAIL_FROM'
];

const validateEnv = () => {
  const missing = REQUIRED_VARS.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    console.error('Missing required environment variables:');
    missing.forEach(v => console.error(   - ));
    console.error('\nPlease check your .env file and try again.');
    process.exit(1);
  }

  console.log('All required environment variables are set.');
};

module.exports = validateEnv;