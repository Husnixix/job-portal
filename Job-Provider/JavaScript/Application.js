document.addEventListener('DOMContentLoaded', function() {
    fetchApplications();
});

function fetchApplications() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost/STAPH/Job-Provider/PHP/GetApplications.php");

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
            if (response.success) {
                var applications = response.data;
                displayApplications(applications);
            } else {
                console.error("Request failed with message:", response.message);
            }
        } else {
            console.error("Request failed with status:", request.status);
        }
    };

    request.onerror = function() {
        console.error("Request failed");
    };

    request.send();
}

function filterByCategory(category) {
    if (category === "Filter by category") {
        fetchApplications(); // If no category selected, fetch all applications
    } else {
        var request = new XMLHttpRequest();
        request.open("GET", "http://localhost/STAPH/Job-Provider/PHP/GetApplications.php?category=" + category);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                if (response.success) {
                    var applications = response.data;
                    displayApplications(applications);
                } else {
                    document.getElementById('xhrResponse').innerText = response.message;
                    console.error("Request failed with message:", response.message);
                }
            } else {
                console.error("Request failed with status:", request.status);
            }
        };

        request.onerror = function() {
            console.error("Request failed");
        };

        request.send();
    }
}

function displayApplications(applications) {
    var tableBody = document.querySelector('#applications-table tbody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Populate table with application data
    applications.forEach(function(application) {
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${application.jobId}</td>
            <td>${application.jobTitle}</td>
            <td>${application.jobPrimaryRole}</td>
            <td>${application.username}</td>
            <td>${application.phoneNumber}</td>
            <td>${application.email}</td>
            <td><button onclick="viewResume('${application.resume}', '${application.username}')" class="btn btn-primary">View Resume</button></td>
            <td>
                <button onclick="showInterviewModal('${application.jobId}', '${application.userId}', '${application.username}', '${application.email}' )" class="btn btn-success">Accept</button>
                <button onclick="respond('${application.userId}', ${application.jobId}')" class="btn btn-danger">Reject</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });
}


function showInterviewModal(jobId, userId, username, email ) {
    // Fill in the necessary details in the modal based on the userId or any other relevant data
    var modal = new bootstrap.Modal(document.getElementById('calender'), {
        backdrop: 'static'
    });

    // Set values for the fields in the modal
    document.getElementById('jobID').value = jobId;
    document.getElementById('UserID').value = userId;
    document.getElementById('name').value = username;
    document.getElementById('email').value = email;
    

    modal.show();
}
const scheduleInterviewForm = document.querySelector('.form');

scheduleInterviewForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Form submitted"); // Debugging statement to check if form submission is triggered

    // Get form data
    var formData = new FormData(this);
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]); // Debugging statement to log form data
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/STAPH/Job-Provider/PHP/Event-Calender.php", true);
    xhr.onload = function(){
        var response = JSON.parse(xhr.responseText);
        var serverResponseElement = document.getElementById('serverResponse');
        if(response.success){
            serverResponseElement.textContent = response.message; 
            serverResponseElement.classList.add('text-success');
            console.log(this.responseText);
            serverResponseElement.style.display = 'block'; // Show the element
            clearFormFields();
            setTimeout(function() {
                serverResponseElement.style.display = 'none'; // Hide the element after 2 seconds
            }, 2000);
        }else{
            serverResponseElement.textContent = response.message;
            serverResponseElement.classList.remove('text-success');
            serverResponseElement.classList.add('text-danger');
            console.log(this.responseText);
            serverResponseElement.style.display = 'block'; // Show the element

            setTimeout(function() {
                serverResponseElement.style.display = 'none'; // Hide the element after 2 seconds
            }, 2000);
        }
    }
    xhr.send(formData);
});

function clearFormFields() {
    document.querySelector('.form').reset();
}

function viewResume(resumePath, username) {
    var fileName = resumePath.substring(resumePath.lastIndexOf('/') + 1);
    var pdfUrl = "http://localhost/STAPH/Job-Seeker/Profile/Resume/" + fileName; // URL to the PDF file
    window.open(pdfUrl, '_blank'); // Open PDF in a new window
}

function respond(userId, jobId) {
    var confirmation = confirm("Are you sure you want to reject this applicant?");
    if (confirmation) {
        // Send the request to delete the user's application
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/STAPH/Job-Provider/PHP/Reject-Application.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function() {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                // Application deleted successfully
                successMessage(response.message);
                console.log(response.message);
                // You can update the UI accordingly
            } else {
                // Error handling if deletion fails
                errorMessage(response.message);
                console.error(response.message);
            }
        };

        xhr.onerror = function() {
            // Error handling for network errors
            console.error("Network error occurred");
        };

        var data = JSON.stringify({ userId: userId, jobId: jobId });
        xhr.send(data);
    }
}

function disableAcceptButton() {
    var acceptButtons = document.querySelectorAll('.btn-success');
    acceptButtons.forEach(function(button) {
        button.disabled = true;
        button.classList.add('disabled');
        // Add any additional styling or functionality if needed
    });
}

function disableRejectButton() {
    var rejectButtons = document.querySelectorAll('.btn-danger');
    rejectButtons.forEach(function(button) {
        button.disabled = true;
        button.classList.add('disabled');
        // Add any additional styling or functionality if needed
    });
}

function errorMessage(message){
    var alertDiv = document.getElementById("alert");
    alertDiv.innerHTML = '<strong>Error !</strong> ' + message;
    alertDiv.classList.remove("alert-success");
    alertDiv.classList.add("alert-danger");
    alertDiv.style.display = "block";

    setTimeout(function() {
        alertDiv.style.display = "none";
    }, 1000);
}

function successMessage(message){
    var alertDiv = document.getElementById("alert");
    alertDiv.innerHTML = '<strong>Success !</strong> ' + message;
    alertDiv.classList.remove("alert-danger");
    alertDiv.classList.add("alert-success");
    alertDiv.style.display = "block";

    // Set a timeout to hide after success Login 
    setTimeout(function() {
        alertDiv.style.display = "none";
    }, 1000);
}