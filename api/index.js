export default function handler(request, response) {
  // Set CORS headers to allow access from any origin
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  const data = {
    message: 'Hello from the Developer boss',
    timestamp: new Date().toISOString(),
  };

  response.status(200).json(data);
}
