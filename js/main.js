async function fetchWebServices() {
    const apiUrl = 'http://localhost:8000/metrics/';
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error fetching web services:', error);
      return [];
    }
  }

  function renderWebService(name,webService) {  
    return `
      <tr>
        <td>${name}</td>
        <td>${webService.trust}</td>
        <td>${webService.response_time}</td>
        <td>${webService.availability}</td>
        <td>${webService.successability}</td>
        <td>${webService.throughput}</td>
        <td>${webService.reliability}</td>
        <td>
        <a href="details.html?name=${name}" class="btn btn-primary">
          View Details
        </a>
        </td>
      </tr>
    `;
  }

  async function displayWebServices() {
    var webServices = await fetchWebServices();
    const tableBody = document.querySelector('#web-services-table tbody');

    for (let w in webServices){
      tableBody.innerHTML += renderWebService(w, webServices[w]);
    }

    $('#web-services-table').DataTable({
      columnDefs: [
        { orderable: false, targets: [0, 5] },
      ],
    });
  }
  
  displayWebServices();