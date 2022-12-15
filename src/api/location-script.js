let searchButton = document.getElementsByClassName("searchButton")[0];
let input = document.getElementsByClassName("searchInput")[0];

searchButton.addEventListener("click", () => {
  let ip = input.value;

  let link = `http://ip-api.com/json/${ip}`;
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      let location = data.city + ", " + data.country + ", " + data.zip;
      let ipInfo = document.getElementsByClassName("ipInfo")[0];
      let locationInfo = document.getElementsByClassName("locationInfo")[0];
      let latitudeInfo = document.getElementsByClassName("latitudeInfo")[0];
      let longitudeInfo = document.getElementsByClassName("longitudeInfo")[0];

      ipInfo.textContent = data.query;
      locationInfo.textContent = location;
      latitudeInfo.textContent = data.lat;
      longitudeInfo.textContent = data.lon;
    });
});
