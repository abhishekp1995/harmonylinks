// Function to validate the form
function validateSystem() {
    // Get the alert message element
    var alertMessage = document.getElementById('alertMessage');

    // Get all the form field values
    const systemDropdown = document.getElementById('systemDropdown').value;
    const quoteText = document.getElementById('quoteText').value;
    const opportunityText = document.getElementById('opportunityText').value;
    const cmsIdText = document.getElementById('cmsIdText').value;
    const quoteLinkText = document.getElementById('quoteLinkText').value;

    // Validate system selection
    if (systemDropdown == 0) {
        alertMessage.style.display = 'block'; // Show alert
        alertMessage.textContent = "Please select the Harmony system.";
        hideDiv(alertMessage, 3000); // Pass alertMessage to hideDiv
        return false; // Prevent form submission
    }

    // Check if at least one field is filled
    if (!quoteText.trim() && !opportunityText.trim() && !cmsIdText.trim() && !quoteLinkText.trim()) {
        alertMessage.style.display = 'block'; // Show alert
        alertMessage.textContent = "Please fill at least one of the fields.";
        hideDiv(alertMessage, 3000); // Pass alertMessage to hideDiv
        return false; // Prevent form submission
    }

    // Handle specific validation for individual fields (future functionality)
    if (cmsIdText.trim()) {
        // Add validation logic if needed (e.g., regex check)
    }

    if (quoteLinkText.trim()) {
        try {
            url='https://www.youtube.com/'
            // If the URL is valid, navigate to it
            new URL(url); // This throws an error if the URL is invalid
            window.location.href = url; // Redirect to the entered URL
        } catch (error) {
            // If the URL is invalid, show an error message
            alertMessage.style.display = 'block';
            alertMessage.textContent = "The entered URL is not valid.";
            hideDiv(alertMessage, 3000);
            return false;
        }
    }

if (opportunityText.trim()) {
    // Add validation logic if needed
}

if (quoteText.trim()) {
    // Add validation logic if needed
}

if (quoteText.trim() && opportunityText.trim()) {
    // Add logic if both Quote and Opportunity fields are filled
}

// If all validation checks pass
return true;
}

// Hide the alert after the specified duration (in milliseconds)
function hideDiv(alertMessage, duration) {
    setTimeout(function () {
        alertMessage.style.display = 'none'; // Hide alert
    }, duration);
}

// Add event listener to the Submit button
document.getElementById('submitButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission
    validateSystem();
});