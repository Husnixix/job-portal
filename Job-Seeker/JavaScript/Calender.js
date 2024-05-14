document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost/STAPH/Job-Seeker/PHP/Calender-View.php");

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            updateTable(data);
        } else {
            console.error("Request failed with status:", request.status);
        }
    };

    request.onerror = function() {
        console.error("Request failed");
    };

    request.send();
}

    function updateTable(data) {
        var tableBody = document.querySelector('tbody');

        // Clear existing table rows
        tableBody.innerHTML = '';

        // Populate table with data
        data.forEach(function(row) {
            var newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${row.job_title}</td>
                <td>${row.company_name}</td>
                <td>${row.start_time}</td>
                <td>${row.end_time}</td>
                <td>${row.location}</td>
                <td><button onclick="request(${row.job_id})" class="btn btn-success btn-sm">Request</button></td>
            `;
            tableBody.appendChild(newRow);
        });
    }


    function request(job_id){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/STAPH/Job-Seeker/PHP/request.php", true );
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 400) {
                var response = JSON.parse(xhr.responseText);
                if(response.success){
                    successMessage(response.message);

                }else{
                    errorMessage(response.message);
                }
            } else {
                console.error("Request failed with status:", xhr.status);
            }
        };

            // Prepare the data to be sent in the request body
        var data = JSON.stringify({ job_id: job_id });
        
        // Send the request
        xhr.send(data);
    }
function errorMessage(message){
    var alertDiv = document.getElementById("alert");
    alertDiv.innerHTML = '<strong>Error !</strong> ' + message;
    alertDiv.classList.remove("alert-success");
    alertDiv.classList.add("alert-danger");
    alertDiv.style.display = "block";

    // Set a timeout to hide after response 
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

    // Set a timeout to hide after response 
    setTimeout(function() {
        alertDiv.style.display = "none";
    }, 1000);
}


