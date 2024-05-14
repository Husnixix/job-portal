document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost/STAPH/Job-Seeker/PHP/Application-View.php");

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
            if (response.success) {
                updateTable(response.data); // Pass the data array to the updateTable function
            } else {
                console.error("Request failed:", response.message);
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

function updateTable(data) {
    var tableBody = document.querySelector('tbody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Populate table with data
    data.forEach(function(row) {
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${row.jobId}</td>
            <td>${row.companyName}</td>
            <td>${row.jobTitle}</td>
            <td>${row.status}</td>
        `;
        tableBody.appendChild(newRow);
    });
}
