document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch job details from server using Ajax
    function fetchJobDetails(jobId) {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const jobDetails = JSON.parse(xhr.responseText);
                    displayJobDetails(jobDetails);
                } else {
                    console.error('Error fetching job details: ' + xhr.status);
                }
            }
        };

        const url = 'http://localhost/STAPH/Website/PHP/about-job.php';
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ jobId: jobId }));
    }

    // Function to display job details on the page
    function displayJobDetails(jobDetails) {
        const jobTitleElement = document.getElementById('jobtitle');
        const employerElement = document.getElementById('companyname');
        const modalityElement = document.getElementById('modality');
        const locationElement = document.getElementById('location');
        const salaryElement = document.getElementById('salary');
        const logoElement = document.getElementById('companyLogo');
        const closingElement = document.getElementById('closingDate');
        const requirementsList = document.getElementById('requirements');
        const responsibilitiesList = document.getElementById('responsibilities');

        logoElement.src = jobDetails[0].company_logo;
        jobTitleElement.innerText = jobDetails[0].job_title;
        employerElement.innerText = jobDetails[0].employer;
        modalityElement.innerText = jobDetails[0].job_modality;
        locationElement.innerText = jobDetails[0].job_location;
        salaryElement.innerText = jobDetails[0].job_salary;
        closingElement.innerText = "Closing Date: " + jobDetails[0].closing_date;

        // Populate requirements
        const requirements = jobDetails[0].job_requirments.split(',');
        requirements.forEach(requirement => {
            const listItem = document.createElement('li');
            listItem.textContent = requirement.trim();
            requirementsList.appendChild(listItem);
        });

        // Populate responsibilities
        const responsibilities = jobDetails[0].job_responsibilites.split(',');
        responsibilities.forEach(responsibility => {
            const listItem = document.createElement('li');
            listItem.textContent = responsibility.trim();
            responsibilitiesList.appendChild(listItem);
        });

    }

    // Main function
    function init() {
        const jobId = new URLSearchParams(window.location.search).get('jobId');
        if (jobId) {
            fetchJobDetails(jobId);
        } else {
            console.error('Job ID not found in URL');
        }
    }

    // Call init function to start the process
    init();
});
