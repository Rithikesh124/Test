document.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.getElementById('message');

    // Fetch data from the PHP backend
    fetch('/api/')
        .then(response => response.json())
        .then(data => {
            messageElement.textContent = data.message;
        })
        .catch(error => {
            messageElement.textContent = 'Error fetching data from the backend.';
            console.error('Error:', error);
        });
});
