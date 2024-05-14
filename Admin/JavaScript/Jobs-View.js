document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost/STAPH/Admin/PHP/Jobs-View.php");

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
            if (response.success) {
                var applications = response.data;
                updateTable(applications);
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
        fetchData(); // If no category selected, fetch all applications
    } else {
        var request = new XMLHttpRequest();
        request.open("GET", "http://localhost/STAPH/Admin/PHP/Jobs-View.php?category=" + category);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                if (response.success) {
                    var applications = response.data;
                    updateTable(applications);
                    ServerResponseSuccess();
                    
                } else {
                    // const ServerResponse = document.getElementById('serverResponse').innerText = response.message;
                    // setTimeout(function() {
                    //     ServerResponse.style.display = "none";
                    // }, 1000);
                    ServerResponseFail();
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

function updateTable(data) {
    var tableBody = document.querySelector('tbody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Check if data is an array
    if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return;
    }

    // Populate table with data
    data.forEach(function(row) {
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${row.id}</td>
            <td>${row.employer}</td>
            <td>${row.job_title}</td>
            <td>${row.posted_date}</td>
            <td>${row.post_status}</td>
            <td><button onclick="deleteRow(${row.id})" class="btn btn-danger btn-sm">Delete</button></td>
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

function deleteRow(id) {
    console.log("ID:", id);
    var confirmed = window.confirm("Are you sure you want to delete this post?");

    if(confirmed){
        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost/STAPH/Admin/PHP/Jobs-Delete.php");
        request.onload = function(){
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);

                if(response.success){
                    successMessage(response.message);
                    fetchData();
                }
                else{
                    errorMessage(response.message);
                }
            } else {
                console.error("Request failed with status:", request.status);
            }
        }
    }
    
    request.onerror = function() {
        console.error("Request failed");
    };

    request.send(JSON.stringify({ id: id }));
    console.log("Delete row with ID:", id);
}

function ServerResponseSuccess(){
    const server = document.getElementById('serverResponse');
    server.innerText = "Jobs found";
}

function ServerResponseFail(){
    const server = document.getElementById('serverResponse');
    server.innerText = "No Jobs found";
    setTimeout(function() {
        server.style.display = "none";
    }, 1000);
}