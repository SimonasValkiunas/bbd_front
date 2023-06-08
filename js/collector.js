const addHeaderButton = document.querySelector('#addHeader');
const requestForm = document.querySelector('#requestForm');
const cancelCollections = document.querySelector('#cancel');

addHeaderButton.addEventListener('click', function() {
  const headersContainer = document.querySelector('#headersContainer');
  const headerRow = document.createElement('div');
  headerRow.className = "header-row";
  headerRow.style.display = "flex";
  headerRow.style.flexDirection = "row";

  const keyInput = document.createElement('input');
  keyInput.className = "form-control header-key";
  keyInput.placeholder = "Header Key";
  const valueInput = document.createElement('input');
  valueInput.className = "form-control header-value";
  valueInput.placeholder = "Header Value";

  headerRow.appendChild(keyInput);
  headerRow.appendChild(valueInput);
  headersContainer.appendChild(headerRow);
});


const startNowCheckbox = document.querySelector('#startNow');
const startDateInput = document.querySelector('#startDate');

startNowCheckbox.addEventListener('change', function() {
    startDateInput.disabled = this.checked;
    if(this.checked) {
      startDateInput.value = ""; 
    }
});

startDateInput.addEventListener('input', function() {
    if(this.value) {
        startNowCheckbox.checked = false;
        startNowCheckbox.disabled = true;
    }
});

startDateInput.addEventListener('change', function() {
    if(this.value === "") {
        startNowCheckbox.disabled = false;
    }
});

requestForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const endpoint = document.querySelector('#endpoint').value;
  const requestBody = document.querySelector('#requestBody').value;
  let startDate = startDateInput.value;
  const endDate = document.querySelector('#endDate').value;


  if (startNowCheckbox.checked) {
    let now = new Date();
    startDate = now.toISOString().slice(0,16);
  }

  let headers = {};
  document.querySelectorAll('.header-row').forEach(function(headerRow) {
    let key = headerRow.querySelector('.header-key').value;
    let value = headerRow.querySelector('.header-value').value;
    if (key && value) {
      headers[key] = value;
    }
  });

  const requestData = {
    endpoint: endpoint,
    requestBody: requestBody,
    startDate: startDate,
    endDate: endDate,
    headers: headers
  };

  const payload = JSON.stringify(requestData);
  console.log(payload);
  fetch("http://localhost:8000/schedule/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload
  })
  .then(r => {
    return r.json();
  })
  .then(r=>{
    alert(r["message"])
  })
});