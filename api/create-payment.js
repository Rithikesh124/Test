const axios = require('axios');

export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).end('Method Not Allowed');
  }

  // Get the secret API key from Vercel Environment Variables
  const merchantApiKey = process.env.OXAPAY_MERCHANT_API_KEY;

  if (!merchantApiKey) {
    return response.status(500).json({ message: 'Server configuration error: API key not found.' });
  }

  try {
    const oxapayUrl = 'https://api.oxapay.com/v1/payment/invoice';
    const requestData = request.body; // Use the data sent from the frontend

    const headers = {
      'merchant_api_key': merchantApiKey,
      'Content-Type': 'application/json',
    };

    // Securely call the OxaPay API from our backend
    const oxapayResponse = await axios.post(oxapayUrl, requestData, { headers });

    // Send the response from OxaPay back to the frontend
    response.status(200).json(oxapayResponse.data);

  } catch (error) {
    console.error('OxaPay API Error:', error.response ? error.response.data : error.message);
    response.status(500).json({ message: 'Failed to create payment invoice.' });
  }
      }
