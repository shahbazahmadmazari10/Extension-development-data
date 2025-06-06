document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("attendanceForm").addEventListener("submit", function (event) {
      event.preventDefault();

      let formData = new FormData(this);
      let params = new URLSearchParams(formData).toString();

      fetch("https://script.google.com/macros/s/AKfycbyGdJkqyO7Ja8xBuymaDa84JVPZvp19t-7ouegUtmcWJ_cUhEA-YZ5Ix31lccpcOOJk/exec", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params
      })
      .then(response => response.text())
      .then(data => {
          document.getElementById("responseMessage").innerText = "✅ " + data;
          document.getElementById("attendanceForm").reset();
      })
      .catch(error => {
          document.getElementById("responseMessage").innerText = "❌ Error submitting data!";
      });
  });

  document.getElementById("GetData").addEventListener("click", function () {
      fetchData();
  });

  function fetchData() {
      fetch("https://script.google.com/macros/s/AKfycbyGdJkqyO7Ja8xBuymaDa84JVPZvp19t-7ouegUtmcWJ_cUhEA-YZ5Ix31lccpcOOJk/exec") // Use the new Web App URL
      .then(response => response.json())
      .then(data => {
          displayData(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }

  function displayData(data) {
      let table = document.getElementById("dataTable");
      table.innerHTML = ""; // Clear previous data

      data.forEach(row => {
          let tr = document.createElement("tr");

          for (let key in row) {
              let td = document.createElement("td");
              td.innerText = row[key];
              tr.appendChild(td);
          }

          table.appendChild(tr);
      });
  }
});
