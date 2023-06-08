
function getParamsFromUrl() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const paramsObj = {};

  for (let [key, value] of params) {
    paramsObj[key] = value;
  }

  return paramsObj;
}

async function fetchWebServiceDetails(url) {
    response = fetch(`http://localhost:8000/graph/?url=${url}`)
      .then(r=>r.json())
      .then(webService => {
        console.log(webService)
    
        for (let w in webService){
          console.log(w)
          document.getElementById('web-service-name').textContent = w.split("www.")[1].toUpperCase();
      

          const times = webService[w].map(metric => metric.time);
          const availability = webService[w].map(metric => metric.availability);
          const avg_response_time = webService[w].map(metric => metric.response_time);
          const reliability = webService[w].map(metric => metric.reliability);
          const throughput = webService[w].map(metric => metric.throughput);
          const trust = webService[w].map(metric => metric.trust);
          const successability = webService[w].map(metric => metric.successability);

          createChart(document.getElementById('trustTimeChart').getContext('2d'), trust, times, 'Trust');
          createChart(document.getElementById('responseTimeChart').getContext('2d'), avg_response_time, times, 'Response Time');
          createChart(document.getElementById('availabilityChart').getContext('2d'), availability, times, 'Availability');
          createChart(document.getElementById('throughputChart').getContext('2d'), throughput, times, 'Throughput');
          createChart(document.getElementById('reliabilityChart').getContext('2d'), reliability, times, 'Reliability');
          createChart(document.getElementById('successabilityChart').getContext('2d'), successability, times, 'Successability');
        }
      })
  }
  
  function createChart(ctx, data, times, label) {
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: times,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
  async function displayWebServiceDetails() {
    url_params = getParamsFromUrl()
    url = url_params["name"]
    var webService = await fetchWebServiceDetails(url);
  }
  
displayWebServiceDetails();
