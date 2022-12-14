let searchButton = document.getElementsByClassName("search-button")[0];
let input = document.getElementsByClassName("search-input")[0];

searchButton.addEventListener("click", () => {
  let ip = input.value;

  let link = `http://ip-api.com/json/${ip}`;
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      let location = data.city + ", " + data.country + ", " + data.zip;
      let ipInfo = document.getElementsByClassName("ip-info")[0];
      let locationInfo = document.getElementsByClassName("location-info")[0];
      let latitudeInfo = document.getElementsByClassName("latitude-info")[0];
      let longitudeInfo = document.getElementsByClassName("longitude-info")[0];

      ipInfo.textContent = data.query;
      locationInfo.textContent = location;
      latitudeInfo.textContent = data.lat;
      longitudeInfo.textContent = data.lon;
    });
});

const logIn = document.getElementById("logIn");
logIn.addEventListener("click", function () {
  logIn.style.display = "none";
  //   generateForm();
  // här sätter vi in vad som ska hända :)
});

// function generateForm() {
//   let formContainer = document.getElementById("form-container");
//   formContainer.innerHTML =
//     "<form>" +
//     "  <label for='username'>Username:</label><br>" +
//     "  <input type='text' id='username'><br>" +
//     "  <label for='password'>Password:</label><br>" +
//     "  <input type='password' id='password'><br><br>" +
//     "</form>";
// }

const logOut = document.getElementById("logOut");
logOut.addEventListener("click", function () {
  // här sätter vi in vad som ska hända :)
  logOut.style.display = "none";
  logIn.style.display = "block";
});
