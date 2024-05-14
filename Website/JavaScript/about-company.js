document.addEventListener('DOMContentLoaded', function(){
    
    function fetchJobDetails(companyID) {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const companyDetails = JSON.parse(xhr.responseText);
                    displayCompanyDetails(companyDetails);
                } else {
                    console.error('Error fetching job details: ' + xhr.status);
                }
            }
        };

        const url = 'http://localhost/STAPH/Website/PHP/about-company.php';
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ companyId: companyID }));
    }

    function displayCompanyDetails(companyDetails) {
        const LogoElement = document.getElementById('logo');
        const CompanyNameElement = document.getElementById('companyName');
        const CompanyBioElement = document.getElementById('companyBio');

        if (companyDetails && companyDetails.length > 0) {
            const company = companyDetails[0];
            LogoElement.src = company.company_logo;
            CompanyNameElement.innerText = company.company_name;
            CompanyBioElement.innerText = company.company_bio;
        } else {
            console.error('No company details found.');
        }
    }
    

    // Main function
    function init() {
        const companyID = new URLSearchParams(window.location.search).get('companyId');
        console.log(companyID);
        if (companyID) {
            fetchJobDetails(companyID);
        } else {
            console.error('Company ID not found in URL');
        }
    }

    // Call init function to start the process
    init();
});
