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

    // The URL of YOUR backend endpoint that you created
    const yourBackendUrl = '/api/create-payment';

    const paymentData = {
       amount: 10, // Example: 10 USD
       currency: "USD",
       return_url: "https://github.com/success", // A dummy success URL
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
        console.log('Payment invoice created:', result);

        if (result.pay_link) {
            statusElement.textContent = `Success! Redirecting to payment page...`;
            // Redirect the user to the OxaPay payment page
            window.location.href = result.pay_link;
        } else {
             statusElement.textContent = `Error: ${result.message || 'Pay link not found.'}`;
        }

    } catch (error) {
        statusElement.textContent = 'Failed to create payment invoice.';
        console.error('Payment Backend Error:', error);
    }
        }
