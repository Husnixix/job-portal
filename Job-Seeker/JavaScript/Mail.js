document.addEventListener('DOMContentLoaded', function() {
    fetchApplications();
});

function fetchApplications() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost/STAPH/Job-Seeker/PHP/Mails.php");

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
            if (response.success) {
                var applications = response.data;
                renderApplications(applications);
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

function renderApplications(applications) {
    var container = document.getElementById('messageContainer');

    applications.forEach(function(application) {
        var row = document.createElement('div');
        row.classList.add('row', 'shadow', 'p-3', 'mt-3');

        var col = document.createElement('div');
        col.classList.add('col-12');

        var messageHeader = document.createElement('strong');
        messageHeader.innerHTML = 'Message! <span class="ms-2 text-success">Unread</span>';
        messageHeader.classList.add('mb-2');

        var messageText = document.createElement('p');
        messageText.textContent = 'Hi ' + application.username + ' your request for reschedule interview for the position '
         + application.jobTitle + ' Reference Id - ' + application.jobID + ' has been approved and rescheduled by ' + application.companyname +
         '. Please find the updated Interview schedule in your calender . Thank you!';

        col.appendChild(messageHeader);
        col.appendChild(messageText);

        row.appendChild(col);
        container.appendChild(row);
    });
}

