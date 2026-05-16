// logging_middleware/index.js
const fetch = require('node-fetch');

let AUTH_TOKEN = '';

/**
 * Sets auth token from outside (after login)
 */
function setAuthToken(token) {
  AUTH_TOKEN = token.trim();
}

/**
 * Logs to server with validation
 */
async function Log(stack, level, pkg, message) {
  const validStacks = ['backend', 'frontend'];
  const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
  const backendPkgs = ['cache','controller','cron job','db','domain','handler','repository','route','service'];
  const frontendPkgs = ['api','component','hook','page','state','style'];
  const commonPkgs = ['auth','config','middleware','utils'];

  // Validate inputs
  if (!validStacks.includes(stack)) {
    console.error(`Invalid stack: ${stack}`);
    return null;
  }
  if (!validLevels.includes(level)) {
    console.error(`Invalid level: ${level}`);
    return null;
  }

  const allowed = [...commonPkgs];
  if (stack === 'backend') allowed.push(...backendPkgs);
  else allowed.push(...frontendPkgs);

  if (!allowed.includes(pkg)) {
    console.error(`Package "${pkg}" not allowed for ${stack}`);
    return null;
  }

  const payload = { stack, level, package: pkg, message };

  try {
    const res = await fetch('http://4.224.186.213/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`✅ [${level}] ${pkg}:`, message);
      return data;
    } else {
      const errText = await res.text();
      console.warn('Failed to send log:', errText);
      return null;
    }
  } catch (err) {
    console.error('Network error while logging:', err.message);
    return null;
  }
}

module.exports = { Log, setAuthToken };