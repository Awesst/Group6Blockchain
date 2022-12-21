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
            })
            .catch(err => console.log(err));
    }

    // call GeoCoding API: Converts given address into lat/long; autocompletes to best match
    function geoCode() {

        let timer; // debouncing

        input.addEventListener("input", () => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                const inputAddress = input.value;
                const myAPIKey = "1bdf6769d5f44e10b1c2bba7b8fe6844";
                const geocodingURL = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(inputAddress)}&apiKey=${myAPIKey}`; // The encodeURIComponent function is used to encode the inputAddress variable as a URL component, which is necessary to properly pass it in the URL

                fetch(geocodingURL)
                    .then((result) => result.json())
                    .then((featureCollection) => {
                        console.log(featureCollection);
                        const foundAddress = featureCollection.features[0];
                        let location = foundAddress.properties.city + ", " + foundAddress.properties.country;

                        let ipInfo = document.getElementsByClassName("ipInfo")[0];
                        let locationInfo = document.getElementsByClassName("locationInfo")[0];
                        let latitudeInfo = document.getElementsByClassName("latitudeInfo")[0];
                        let longitudeInfo = document.getElementsByClassName("longitudeInfo")[0];

                        ipInfo.textContent = ""; // to empty IP field when not known
                        locationInfo.textContent = location;
                        latitudeInfo.textContent = foundAddress.properties.lat;
                        longitudeInfo.textContent = foundAddress.properties.lon;

                        localStorage.setItem("latitude", foundAddress.properties.lat);
                        localStorage.setItem("longitude", foundAddress.properties.lon);

                    })
                    .catch((err) => console.log(err));
            }, 1000); // the debouncing interval, in this case 1 second
        });
    }

    searchButton.addEventListener("click", () => {

        // regular expression that is used to match an IPv4 address
        const isValidIp = value => (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value) ? true : false);

        // Check if the input element is empty
        if (!input.value) {
            geoLocate();
        }

        // input is a valid IPv4 address --> geoLocate()
        else if (isValidIp(input.value)) {
            geoLocate();
        }

        // input is not a valid IPv4 address --> assume it's an address --> geoCode()
        else if (!isValidIp(input.value)) {
            geoCode();
        }

        else {
            ipInfo.textContent = "Make sure you entered a valid address";
            // as the second API autocompletes wery widely, we pretty much never end up here. Kept it as placeholder just to close the statement.
        }
    })
}
