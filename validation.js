// Function to validate the form

function validateSystem() {
    // Get the alert message element
    var alertMessage = document.getElementById('alertMessage');
    var message = null

    // Get all the form field values
    const systemDropdown = document.getElementById('systemDropdown').value;
    const quoteText = document.getElementById('quoteText').value.trim();
    const opportunityText = document.getElementById('opportunityText').value.trim();
    const cmsIdText = document.getElementById('cmsIdText').value.trim();
    const quoteLinkText = document.getElementById('quoteLinkText').value.trim();

    // Validate system selection
    if (systemDropdown == 0) {
        message = "Please select the Harmony system.";
        showHideErrorMessage(alertMessage, message, 3000); // 
        return false; // Prevent form submission
    }

    // Check if at least one field is filled
    if (!quoteText && !opportunityText && !cmsIdText && !quoteLinkText) {
        message = "Please fill at least one of the fields.";
        showHideErrorMessage(alertMessage, message, 3000); // Pass alertMessage to hideDiv
        return false; // Prevent form submission
    }

    // Handle specific validation for individual fields
    if (quoteText) {
        if (isNaN(Number(quoteText))) {
            message = "Quote ID invalid ! Only numbers allowed.";
            showHideErrorMessage(alertMessage, message, 3000);
            return false;
        }
    }

    if (opportunityText) {
        if (isNaN(Number(opportunityText))) {
            message = "Opportunity ID invalid ! Only numbers allowed.";
            showHideErrorMessage(alertMessage, message, 3000);
            return false;
        }
    }

    if (quoteLinkText) {
        if (isNaN(Number(quoteLinkText))) {
            message = "Quote ID invalid ! Only numbers allowed.";
            showHideErrorMessage(alertMessage, message, 3000);
            return false;
        }
    }

    if (cmsIdText) {
        if (isNaN(Number(cmsIdText))) {
            message = "CMS ID invalid ! Only numbers allowed.";
            showHideErrorMessage(alertMessage, message, 3000);
            return false;
        }
    }
    // If all validation checks pass
    return true
}

//Show error message and hide after specified duration (in milliseconds)
function showHideErrorMessage(alertMessage, message, duration) {
    alertMessage.style.display = 'block';
    alertMessage.textContent = message;
    setTimeout(function () {
        alertMessage.style.display = 'none'; // Hide alert
    }, duration);
}

//Redirect to the respective page 
function redirectUrl() {
    var alertMessage = document.getElementById('alertMessage');
    const quoteText = document.getElementById('quoteText').value.trim();
    const opportunityText = document.getElementById('opportunityText').value.trim();
    const cmsIdText = document.getElementById('cmsIdText').value.trim();
    const quoteLinkText = document.getElementById('quoteLinkText').value.trim();
    if (quoteText && !(opportunityText || cmsIdText || quoteLinkText)) {
        const url = `https://example.com?opportunityText=${encodeURIComponent(quoteText)}`;
        // Redirect to the URL
        window.location.href = url;
    }
    else if (opportunityText && !(quoteText || cmsIdText || quoteLinkText)) {
        // Create the URL with opportunityText as a parameter
        const url = `https://example.com?opportunityText=${encodeURIComponent(opportunityText)}`;
        // Redirect to the URL
        window.location.href = url;
    }
    else if (quoteLinkText && !(quoteText || cmsIdText || opportunityText)) {
        const url = `https://example.com?opportunityText=${encodeURIComponent(quoteLinkText)}`;
        // Redirect to the URL
        window.location.href = url;
    }
    else if (cmsIdText && !(quoteText || quoteLinkText || opportunityText)) {
        const url = `https://example.com?opportunityText=${encodeURIComponent(cmsIdText)}`;
        // Redirect to the URL
        window.location.href = url;
    }
    //Show error message if more than one field given
    else {
        message = "Invalid input combination ! Not more than 1 field should be filled";
        showHideErrorMessage(alertMessage, message, 5000);
    }
}

// Add event listener to the Submit button
document.getElementById('submitButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission
    if (validateSystem()) {
        //if validation check pass
        redirectUrl();
    }
});