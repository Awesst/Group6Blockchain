export function rollApi(searchButton, input) {

    // function that converts ipv4 IP address to approx. location and coordinates
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
            })
            .catch(err => console.log(err));
    }

    // call GeoCoding API: Converts given address into lat/long; autocompletes to best match
    function geoCode() {

        input.addEventListener((input), () => {

            const inputAddress = debounce(input.value);      // debouncing input: see debounce()
            const myAPIKey = "c5bc2c56928c4feb80c40df48fe1426c";
           
            const geocodingURL = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(inputAddress)}&apiKey=${myAPIKey}`;

            // Call Geocoding API - https://www.geoapify.com/geocoding-api/
            fetch(geocodingURL).then(result => result.json())
                .then(featureCollection => {
                    console.log(featureCollection);
                    const foundAddress = featureCollection.features[0];
                    let location = foundAddress.properties.city + ", " + foundAddress.properties.country;

                    let ipInfo = document.getElementsByClassName('ipInfo')[0];
                    let locationInfo = document.getElementsByClassName('locationInfo')[0];
                    let latitudeInfo = document.getElementsByClassName('latitudeInfo')[0];
                    let longitudeInfo = document.getElementsByClassName('longitudeInfo')[0];

                    ipInfo.textContent = ""; // to empty IP field when not known
                    locationInfo.textContent = location;
                    latitudeInfo.textContent = foundAddress.properties.lat;
                    longitudeInfo.textContent = foundAddress.properties.lon;
                })
                .catch(err => console.log(err));
        })
    }

    searchButton.addEventListener('click', () => {

        const octet = '(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)';
        const ipFormat = new RegExp(`^${octet}\\.${octet}\\.${octet}\\.${octet}$`);

        // keep this for now for more possible checks. 
        //const isValidIp = value => (/^(?!\.)((^|\.)([1-9]?\d|1\d\d|2(5[0-5]|[0-4]\d))){4}$/.test(value) ? true : false);

        if (!input.value) {
            geoLocate();
        }

        else if (input.value !== ipFormat && input.value) {
            geoCode();
        }

        else {
            alert("Make sure you entered a valid city/country");
            // currently since the second APi autocompletes, we never end up here. I kept it for user-entered IP address that is invalid. Keep it for now, just to be able to close the if statement. Format as well, don't do just alert
        }

    })
}

// debouncing: eliminating unwanted signals from an input, so that it doesn't send a query after every key pressed, but with a delay in [ms]

function debounce(func, delay = 1000) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
