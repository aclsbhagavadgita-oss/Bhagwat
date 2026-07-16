// Redirect to the optimized Next.js standalone server
// This prevents memory issues (503 Service Unavailable) on Hostinger
try {
  require('./.next/standalone/server.js');
} catch (err) {
  console.error("Failed to start standalone server. Did the build complete successfully?", err);
  process.exit(1);
}
