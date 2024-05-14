document.addEventListener('DOMContentLoaded', function() {
    fetchApplications();
});

function fetchApplications() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost/STAPH/Job-Provider/PHP/Interviews.php");

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
            <td>${application.username}</td>
            <td>${application.phoneNumber}</td>
            <td>${application.start}</td>
            <td>${application.end}</td>
            <td>${application.location}</td>
        `;
        tableBody.appendChild(newRow);
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