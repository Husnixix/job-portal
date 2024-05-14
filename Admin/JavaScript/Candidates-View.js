document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost/STAPH/Admin/PHP/Candidates-View.php");

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
            <td>${row.id}</td>
            <td>${row.first_name} ${row.last_name}</td>
            <td>${row.phone_number}</td>
            <td>${row.email}</td>
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
    var confirmed = window.confirm("Are you sure you want to delete this row?");

    if(confirmed){
        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost/STAPH/Admin/PHP/Candidates-Delete.php");
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
