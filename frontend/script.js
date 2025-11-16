document.addEventListener('DOMContentLoaded', () => {
    fetchPhpMessage(); // Fetch the initial message when the page loads
});

// --- Function to interact with the PHP backend ---
function fetchPhpMessage() {
    const messageElement = document.getElementById('php-message');
    messageElement.textContent = 'Loading...';

    // Calls your /api/index.php endpoint
    fetch('/api/')
        .then(response => response.json())
        .then(data => {
            messageElement.textContent = data.message;
        })
        .catch(error => {
            messageElement.textContent = 'Error fetching data.';
            console.error('PHP Backend Error:', error);
        });
}

// --- Function to interact with the Node.js payment backend ---
async function createPaymentInvoice() {
    const statusElement = document.getElementById('payment-status');
    statusElement.textContent = 'Creating invoice, please wait...';

    const yourBackendUrl = '/api/create-payment';

    const paymentData = {
       amount: 10,
       currency: "USD",
       return_url: "https://github.com/success",
       order_id: `ORD-DEMO-${Date.now()}`,
       description: "Test payment"
    };

    try {
        const response = await fetch(yourBackendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Received response from backend:', result);

        // --- THE FIX IS HERE ---
        // Check for result.data AND result.data.payment_url to safely access the nested property.
        if (result.data && result.data.payment_url) {
            statusElement.textContent = `Success! Redirecting to payment page...`;
            
            // Redirect the user to the correct, nested payment URL.
            window.location.href = result.data.payment_url;
        } else {
             // If the format is unexpected, show an error. Use the message from the API if available.
             statusElement.textContent = `Error: ${result.error.message || 'Payment URL not found in response.'}`;
        }

    } catch (error) {
        statusElement.textContent = 'Failed to create payment invoice.';
        console.error('Payment Backend Error:', error);
    }
        }
