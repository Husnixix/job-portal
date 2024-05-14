document.addEventListener("DOMContentLoaded", function() {
    const title = document.getElementById("title");
    
    title.addEventListener('keyup', function() {
        var input = title.value.trim();
        
        if (input !== "") {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost/STAPH/Job-Seeker/PHP/Live-Search.php", true);
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

    function searchResponseSuccess() {
        const searchResponse = document.getElementById('serverResponse');
        searchResponse.style.display = "block";
        searchResponse.innerText = "Data found";
    }

    function searchResponseFailed() {
        const searchResponse = document.getElementById('serverResponse');
        searchResponse.style.display = "block";
        searchResponse.innerText = "Data not found";
    }

    const searchForm = document.querySelector(".searchForm");

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/STAPH/Job-Seeker/PHP/search.php");
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                searchResponseSuccess();
                displayJobs(response.message);
            } else {
                searchResponseFailed();
                // Handle failure case if needed
            }
        };
        xhr.send(formData);
    });

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

        xhr.open('GET', 'http://localhost/STAPH/Job-Seeker/PHP/Job-Listing.php', true);
        xhr.send();
    }

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
                                    <a href="#" class="card-link apply" data-job-id="${job.id}">Apply<i class="bi bi-arrow-right ms-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            jobContainer.innerHTML += jobHtml;
        });

        var jobTitles = document.querySelectorAll('.card-title');
        jobTitles.forEach(function(titleElement, index) {
            titleElement.addEventListener('click', function(event) {
                event.preventDefault();
                var jobId = data[index].id;
                window.location.href = `http://localhost/STAPH/Website/about-job.html?jobId=${jobId}`;
            });
        });

        var companyTitles = document.querySelectorAll('.card-subtitle');
        companyTitles.forEach(function(titleElement, index) {
            titleElement.addEventListener('click', function(event) {
                event.preventDefault();
                var companyId = data[index].company_id;
                window.location.href = `http://localhost/STAPH/Website/about-company.html?companyId=${companyId}`;
            });
        });

        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('apply')) {
                event.preventDefault();
                var jobId = event.target.dataset.jobId;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost/STAPH/Job-Seeker/PHP/apply.php");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onload = function() {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        alert("Successfully applied!");
                        var details = response.data;
                        var message = "This is to confirm we have received your profile for the position " + details.job_title + 
                        ". If shortlisted, we will call you regarding next steps.";
          
                        sendEmail(details.UserEmail, details.company_name, details.UserFirstName, message);
                    } else {
                        alert("Failed to apply: " + response.message);
                        
                    }
                };
                var formData = "jobId=" + encodeURIComponent(jobId);
                xhr.send(formData);

                function sendEmail(toEmail, fromName, toName, message) {
                    // Replace these values with your EmailJS configuration
                    const serviceID = 'service_kmlx92q';
                    const templateID = 'template_bfn8z9l';

                   
                
                    // Prepare the email parameters
                    const emailParams = {
                        to_email: toEmail,
                        from_name: fromName,
                        to_name: toName,
                        message: message
                    };
                
                    // Send the email using EmailJS
                    emailjs.send(serviceID, templateID, emailParams)
                        .then(function(response) {
                            console.log('Email sent successfully:', response);
                            alert('Email sent successfully');
                            // Handle success, if needed
                        })
                        .catch(function(error) {
                            console.error('Failed to send email:', error);
                            alert('Failed to send email');
                            // Handle error, if needed
                        });
                }
                
            }
        });
    }

    fetchJobs();
});
