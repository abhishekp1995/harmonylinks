// Function to validate the form

function validateSystem() {
    // Get the alert message element
    var alertMessage = document.getElementById('alertMessage');
    var message = null

    // Get all the form field values
    const systemDropdown = document.getElementById('systemDropdown').value;
    const systemVersion = document.getElementById('systemVersion').value;
    const quoteText = document.getElementById('quoteText').value.trim();
    const opportunityText = document.getElementById('opportunityText').value.trim();
    const cmsIdText = document.getElementById('cmsIdText').value.trim();
    const quoteLinkText = document.getElementById('quoteLinkText').value.trim();

    // Validate system version
    if (systemVersion == 0) {
        message = "Please select CPQ version.";
        showHideErrorMessage(alertMessage, message, 3000);
        return false;
    }

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

//Worklist
function Getworklist(quoteId) {
    url = 'https://fiorilaunchpad-sapitcloud.dispatcher.hana.ondemand.com/sap/fiori/dealapprovalworklist/callidus/customapi/executescriptfed'
    headerdata = {
        //'Content-Type': 'form data',
        "Host": 'fiorilaunchpad-sapitcloud.dispatcher.hana.ondemand.com',
        "Referer": 'https://fiorilaunchpad-sapitcloud.dispatcher.hana.ondemand.com/sites',
        "Origin": 'https://fiorilaunchpad-sapitcloud.dispatcher.hana.ondemand.com'
    }
    params = {
        "RequestType": [],
        "RevenueType": [],
        "RequestArea": [],
        "RequestStatus": ["Requested", "Assigned", "In Progress"],
        "TeamResponsible": [],
        "PersonResponsible": "",
        "ApproverSubstitute": "",
        "QuoteNumber": quoteId,
        "QuoteSalesOrg": [],
        "QuoteCostCenter": [],
        "QuoteCustomerId": "",
        "DealHealth": [],
        "QuoteStatus": [],
        "CmsCaseId": "",
        "DealId": "",
        "QuoteOwner": "",
        "IsMainQuote": "",
        "WorkAtRiskFlag": "",
        "StatusAge": "",
        "RevenueRange": "",
        "Description": "",
        "SalesOffice": [],
        "SalesGroup": [],
        "ProcessType": [],
        "Channel": [],
        "AccountClassification": [],
        "DealStructure": [],
        "CloudLoB": [],
        "CloseByDate": "",
        "ChannelPartner": "",
        "StartDate": "",
        "EndDate": ""
    }
    formdata = new FormData()
    formdata.append("scriptname", "GetWorkList")
    formdata.append("domain", "")
    formdata.append("Param", JSON.stringify(params))
    fetch(url,
        {
            method: "POST",  // HTTP method
            headers: headerdata,
            //credentials:"include",
            body: formdata
        })
        .then(response => response.json())  // Convert response to JSON
        .then(result => console.log("Success:", result))  // Handle successful response
        .catch(error => console.error("Error:", error));  // Handle errors
}

//Redirect to the respective page 
function redirectUrl() {
    var alertMessage = document.getElementById('alertMessage');
    var isvalidURL = true;
    var url_prod = null;
    var url_test = null;
    var url_dev = null;

    const systemDropdown = document.getElementById('systemDropdown').value;
    const systemVersion = document.getElementById('systemVersion').value;
    const quoteText = document.getElementById('quoteText').value.trim();
    const opportunityText = document.getElementById('opportunityText').value.trim();
    const cmsIdText = document.getElementById('cmsIdText').value.trim();
    const quoteLinkText = document.getElementById('quoteLinkText').value.trim();

    //set URL based on filled field values
    if (opportunityText && !(quoteText || cmsIdText || quoteLinkText)) {
        url_prod1 = `https://sapit-home-prod-004.launchpad.cfapps.eu10.hana.ondemand.com/site#harmonyquote-Display&/Opportunity/${encodeURIComponent(opportunityText)}`;
        url_test1 = `https://sapit-home-test-004.launchpad.cfapps.eu10.hana.ondemand.com/site#harmonyquote-Display&/Opportunity/${encodeURIComponent(opportunityText)}`;
        url_dev1 = `https://sapit-sales-dev-camel.launchpad.cfapps.eu10.hana.ondemand.com/site?siteId=486ef322-43fb-476a-9823-57eb1ec02c9a#harmonyquote-Display&/Opportunity/${encodeURIComponent(opportunityText)}`;
    }
    else if (opportunityText && quoteText && !(cmsIdText || quoteLinkText)) {
        url_prod1 = `https://sapit-home-prod-004.launchpad.cfapps.eu10.hana.ondemand.com/site#harmonyquote-Display&/Opportunity/${encodeURIComponent(opportunityText)}/Quotedetails/${encodeURIComponent(quoteText)}`;
        url_prod2 = `https://sapit-home-prod-004.launchpad.cfapps.eu10.hana.ondemand.com/site#harmonyquote-Display&/Opportunity/${encodeURIComponent(opportunityText)}/Quote2Details/${encodeURIComponent(quoteText)}`;
        url_test1 = `https://sapit-home-test-004.launchpad.cfapps.eu10.hana.ondemand.com/site#harmonyquote-Display&/Opportunity/${encodeURIComponent(opportunityText)}/Quotedetails/${encodeURIComponent(quoteText)}`;
        url_test2 = `https://sapit-home-test-004.launchpad.cfapps.eu10.hana.ondemand.com/site#harmonyquote-Display&/Opportunity/${encodeURIComponent(opportunityText)}/Quote2Details/${encodeURIComponent(quoteText)}`;
        url_dev1 = `https://sapit-sales-dev-camel.launchpad.cfapps.eu10.hana.ondemand.com/site?siteId=486ef322-43fb-476a-9823-57eb1ec02c9a#harmonyquote-Display&/Opportunity/${encodeURIComponent(opportunityText)}/Quotedetails/${encodeURIComponent(quoteText)}`;
        url_dev2 = `https://sapit-sales-dev-camel.launchpad.cfapps.eu10.hana.ondemand.com/site?siteId=486ef322-43fb-476a-9823-57eb1ec02c9a#harmonyquote-Display&/Opportunity/${encodeURIComponent(opportunityText)}/Quote2Details/${encodeURIComponent(quoteText)}`;

    }
    else if (quoteLinkText && !(quoteText || cmsIdText || opportunityText)) {
        url_prod1 = `https://sap-ies-sales.cpq.cloud.sap/fed/sap/Cart/Edit?cartCompositeNumber=${encodeURIComponent(quoteLinkText)}`;
        url_tes1 = `https://sap-ies-sales-test.cpq.cloud.sap/fed/sap/Cart/Edit?cartCompositeNumber=${encodeURIComponent(quoteLinkText)}`;
        url_dev1 = `https://sap-ies-sales-dev.cpq.cloud.sap/fed/sap/Cart/Edit?cartCompositeNumber=${encodeURIComponent(quoteLinkText)}`;
    }
    else if (cmsIdText && !(quoteText || quoteLinkText || opportunityText)) {
        url_prod1 = `https://isp.hec.net.sap/sap/bc/webdynpro/sap/zv_cms_rcm_wda_case?sap-wd-configId=ZV_CMS_RCM_WAC_CASE&CASE_MODE=D&CASE_ID=${encodeURIComponent(cmsIdText)}`;
        url_test1 = `https://ist.hec.net.sap/sap/bc/webdynpro/sap/zv_cms_rcm_wda_case?sap-wd-configId=ZV_CMS_RCM_WAC_CASE&CASE_MODE=D&CASE_ID=${encodeURIComponent(cmsIdText)}`;
        url_dev1 = `https://isd.hec.net.sap/sap/bc/webdynpro/sap/zv_cms_rcm_wda_case?sap-wd-configId=ZV_CMS_RCM_WAC_CASE&CASE_MODE=D&CASE_ID=${encodeURIComponent(cmsIdText)}`;
    }

    else {
        isvalidURL = false
    }

    //Show error message if more than one field given
    if (!isvalidURL) {
        message = "Invalid input combination !";
        showHideErrorMessage(alertMessage, message, 5000);
    }

    else {
        // Redirect to the URL based on system version
        if (systemVersion == 1) {

            // Redirect to the URL based on system dropdown
            if (systemDropdown == 1)
                window.location.href = url_prod1;
            if (systemDropdown == 2)
                window.location.href = url_test1;
            if (systemDropdown == 3)
                window.location.href = url_dev1;

        }
        if (systemVersion == 2) {
            // Redirect to the URL based on system dropdown
            if (systemDropdown == 1)
                window.location.href = url_prod2;
            if (systemDropdown == 2)
                window.location.href = url_test2;
            if (systemDropdown == 3)
                window.location.href = url_dev2;
        }
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