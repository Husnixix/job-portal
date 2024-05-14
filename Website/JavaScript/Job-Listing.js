document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to search input
    const title = document.getElementById("title");
    
    title.addEventListener('keyup', function() {
        var input = title.value.trim();
        
        if (input !== "") {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost/STAPH/Website/PHP/Live-Search.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            
            xhr.onload = function() {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    searchResponseSuccess();
                    liveDataJobs(response.message);
                } else {
                    searchResponseFailed();
                    // Handle failure case if needed
                }
            };
            
            var formData = "input=" + encodeURIComponent(input);
            xhr.send(formData);
        }
    });

    function liveDataJobs(data) {
        var jobContainer = document.getElementById('jobContainer');
        jobContainer.innerHTML = '';

        if (data && Array.isArray(data)) {
            data.forEach(function(liveData) {
                var jobHtml = `
                    <div class="container mt-5 rounded shadow">
                        <div class="row">
                            <div class="col-12">
                                <div class="card rounded border border-0" style="width: 100%;">
                                    <img src="${liveData.company_logo}" class="ms-3 mt-3 border rounded" alt="Company Logo">
                                    <div class="card-body">
                                        <a href="./about-job.html?jobId=${liveData.id}" class="card-title block-title">${liveData.job_title}</a>
                                        <a href="./about-company.html?companyId=${liveData.company_id}" class="card-subtitle mb-2 text-body-secondary block-subtitle">${liveData.employer}</a>
                                        <p class="card-text mb-2">${liveData.job_primary_role}</p>
                                        <div class="row mb-2">
                                            <div class="col-auto">
                                                <p class="card-text"><i class="bi bi-laptop me-2"></i>${liveData.job_type}</p>
                                            </div>
                                            <div class="col-auto">
                                                <p class="card-text"><i class="bi bi-geo-alt me-2"></i>${liveData.job_location}</p>
                                            </div>
                                            <div class="col-auto">
                                                <p class="card-text"><i class="bi bi-currency-rupee me-2"></i>${liveData.job_salary}</p>
                                            </div>
                                        </div>
                                        <p class="card-text mb-1">Posted on ${liveData.posted_date}.</p>
                                        <a href="#" class="card-link share"><i class="bi bi-arrow-repeat me-1"></i>Share</a>
                                        <a href="#" class="card-link apply" data-job-id="${liveData.id}">Apply<i class="bi bi-arrow-right ms-1"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                jobContainer.innerHTML += jobHtml;
            });
        } else {
            console.error('Invalid or empty data received:', data);
        }
    }
    // Add event listeners to dropdown menus
    document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
        menu.addEventListener('change', function() {
            // Call a function to collect selected dropdown values and trigger filtering
            filterJobs();
        });
    });

    // Function to collect selected dropdown values and trigger filtering
    function filterJobs() {
        // Collect selected values from all dropdowns
        var selectedValues = {};
        document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
            var filterType = menu.dataset.filterType;
            var selectedOptions = [];
            menu.querySelectorAll('input[type="checkbox"]:checked').forEach(function(checkbox) {
                selectedOptions.push(checkbox.value);
            });
            selectedValues[filterType] = selectedOptions;
        });

        // Send selected values to the server for filtering
        var formData = new FormData();
        formData.append('filters', JSON.stringify(selectedValues));

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/STAPH/Website/PHP/filter.php");
        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                searchResponseSuccess();
                displayFilteredJobs(data);
            } else {
                searchResponseFailed();
                jobContainer.innerHTML = ''; // Clear previous job listings
                console.error('Error filtering jobs: ' + xhr.status);
            }
        };
        xhr.send(formData);
    }

    // Function to display filtered jobs
    function displayFilteredJobs(data) {
        // Display the filtered jobs as you normally would
        console.log(data);
    }

    // Rest of your existing code...

    // Function to fetch and display jobs
    function fetchJobs() {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    displayJobs(data);
                } else {
                    console.error('Error fetching jobs: ' + xhr.status);
                }
            }
        };

        xhr.open('GET', 'http://localhost/STAPH/Website/PHP/Job-Listing.php', true);
        xhr.send();
    }

    // Function to display fetched jobs
    function displayJobs(data) {
        var jobContainer = document.getElementById('jobContainer');
        jobContainer.innerHTML = '';

        data.forEach(function(job) {
            var jobHtml = `
                <div class="container mt-5 rounded shadow">
                    <div class="row">
                        <div class="col-12">
                            <div class="card rounded border border-0" style="width: 100%;">
                                <img src="${job.company_logo}" class="ms-3 mt-3 border rounded" alt="Company Logo">
                                <div class="card-body">
                                    <a href="./about-job.html?jobId=${job.id}" class="card-title block-title">${job.job_title}</a>
                                    <a href="./about-company.html?companyId=${job.company_id}" class="card-subtitle mb-2 text-body-secondary block-subtitle">${job.employer}</a>
                                    <p class="card-text mb-2">${job.job_primary_role}</p>
                                    <div class="row mb-2">
                                        <div class="col-auto">
                                            <p class="card-text"><i class="bi bi-laptop me-2"></i>${job.job_type}</p>
                                        </div>
                                        <div class="col-auto">
                                            <p class="card-text"><i class="bi bi-geo-alt me-2"></i>${job.job_location}</p>
                                        </div>
                                        <div class="col-auto">
                                            <p class="card-text"><i class="bi bi-currency-rupee me-2"></i>${job.job_salary}</p>
                                        </div>
                                    </div>
                                    <p class="card-text mb-1">Posted on ${job.posted_date}.</p>
                                    <a href="#" class="card-link share"><i class="bi bi-arrow-repeat me-1"></i>Share</a>
                                    <a href="#" class="card-link apply">Apply<i class="bi bi-arrow-right ms-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

            jobContainer.innerHTML += jobHtml;
        });

        // Add event listener to job titles
        var jobTitles = document.querySelectorAll('.card-title');
        jobTitles.forEach(function(titleElement, index) {
            titleElement.addEventListener('click', function(event) {
                // Prevent default link behavior
                event.preventDefault();
                // Get the job ID from the corresponding job object in the data array
                var jobId = data[index].id;
                // Redirect to about-job page with job ID as query parameter
                window.location.href = `http://localhost/STAPH/Website/about-job.html?jobId=${jobId}`;
            });
        });

        var companyTitles = document.querySelectorAll('.card-subtitle');
        companyTitles.forEach(function(titleElement, index) {
            titleElement.addEventListener('click', function(event) {
                // Prevent default link behavior
                event.preventDefault();
                // Get the company ID from the corresponding job object in the data array
                var companyId = data[index].company_id;
                // Redirect to about-company page with company ID as query parameter
                window.location.href = `http://localhost/STAPH/Website/about-company.html?companyId=${companyId}`;
            });
        });
    }

    // Call the fetchJobs function to initially load jobs
    fetchJobs();

    // Function to handle search response success
    function searchResponseSuccess(){
        const searchResponse = document.getElementById('serverResponse');
        searchResponse.style.display = "block";
        searchResponse.innerText ="Data found";
    }

    // Function to handle search response failure
    function searchResponseFailed(){
        const searchResponse = document.getElementById('serverResponse');
        searchResponse.style.display = "block";
        searchResponse.innerText ="Data not found";
    }
});
