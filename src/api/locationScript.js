export function rollApi(searchButton, input) {

    // function that converts IPv4 IP address to approx. location and coordinates
    function geoLocate() {

        let ip = input.value;

        const geoLocateURL = `http://ip-api.com/json/${ip}`;
        fetch(geoLocateURL)
            .then(response => response.json())
            .then(data => {

                let location = data.city + ", " + data.country + ", " + data.zip;
                let ipInfo = document.getElementsByClassName('ipInfo')[0];
                let locationInfo = document.getElementsByClassName('locationInfo')[0];
                let latitudeInfo = document.getElementsByClassName('latitudeInfo')[0];
                let longitudeInfo = document.getElementsByClassName('longitudeInfo')[0];

                ipInfo.textContent = data.query;
                locationInfo.textContent = location;
                latitudeInfo.textContent = data.lat;
                longitudeInfo.textContent = data.lon;

                localStorage.setItem("latitude", data.lat);
                localStorage.setItem("longitude", data.lon);
                localStorage.setItem("city", data.city);
                localStorage.setItem("country", data.country);
            })
            .catch(err => console.log(err));
    }

    // call GeoCoding API: Converts given address into lat/long; autocompletes to best match
    const myAPIKey = "1bdf6769d5f44e10b1c2bba7b8fe6844";
    const geocodingURL = "https://api.geoapify.com/v1/geocode/search";

    let timeoutId;

    async function geoCode(address) {
        // Clear any existing timeout
        clearTimeout(timeoutId);

        // Set a new timeout to call the function after 1 second
        timeoutId = setTimeout(async () => {
            // Build the API request URL
            const requestURL = `${geocodingURL}?apiKey=${myAPIKey}&text=${encodeURIComponent(address)}`;

            // Make the API request
            const response = await fetch(requestURL);
            const data = await response.json();

            // Check if the data object is not null or undefined
            if (data && data.features) {
                
                let ipInfo = document.getElementsByClassName("ipInfo")[0];
                let locationInfo = document.getElementsByClassName("locationInfo")[0];
                let latitudeInfo = document.getElementsByClassName("latitudeInfo")[0];
                let longitudeInfo = document.getElementsByClassName("longitudeInfo")[0];

                // Extract the city, country, latitude, and longitude from the API response

                const city = data.features[0].properties.city;
                const country = data.features[0].properties.country;
                const latitude = data.features[0].geometry.coordinates[1];
                const longitude = data.features[0].geometry.coordinates[0];

                let location = data.features[0].properties.city + ", " + data.features[0].properties.country;

                ipInfo.textContent = ""; // to empty IP field when not known
                locationInfo.textContent = location;
                latitudeInfo.textContent = data.features[0].geometry.coordinates[1];
                longitudeInfo.textContent = data.features[0].geometry.coordinates[0];

                localStorage.setItem("latitude", data.features[0].geometry.coordinates[1]);
                localStorage.setItem("longitude", data.features[0].geometry.coordinates[0]);
                localStorage.setItem("city", data.features[0].properties.city);
                localStorage.setItem("country", data.features[0].properties.country);
            }
        }, 750);
    }



    // EVENT LISTENERS
    // Add an event listener to the input field
    input.addEventListener("input", () => {
        // Get the user-entered text from the input field
        const address = input.value;

        // Check if the input is a valid IPv4 address
        const isValidIp = value => (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value));

        // If the input is an empty string or a valid IPv4 address, invoke geoLocate()
        if (!address || isValidIp(address)) {
            geoLocate();
        }
        // If the input is not a valid IPv4 address and is not an empty string, assume it's an address and invoke geoCode()
        else if (address) {
            geoCode(address);
        }
    });

    // Add an event listener to the location icon
    const gpsWrapper = document.querySelector('.gpsWrapper');

    gpsWrapper.addEventListener("click", () => {

        // Check if the input element is empty
        if (!input.value) {
            geoLocate();
        }

    })
}
