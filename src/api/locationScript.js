export function rollApi(searchButton, input) {


    let ip = input.value;

    // function that converts ipv4 IP address to approx. location and coordinates
    function geoLocate() {

        let link = `http://ip-api.com/json/${ip}`;   
        fetch(link)
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
    }

    // call GeoCoding API: Converts given address into lat/long; autocompletes to best match
    function geoCode() {

        input.addEventListener("input", () => {

            const inputAddress = input.value;

            /* I have two APi keys: 
            1bdf6769d5f44e10b1c2bba7b8fe6844
            d464031d465347aea999824e70b8ac2c
            Whe site doesn't fetch, replace API key, that often fixes it  */
            const myAPIKey = "1bdf6769d5f44e10b1c2bba7b8fe6844";

            const geocodingURL = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(inputAddress)}&apiKey=${myAPIKey}`;

            // https://www.geoapify.com/tutorial/how-to-implement-geocoding-javascript-tutorial
            fetch(geocodingURL).then(result => result.json())
                .then(featureCollection => {

                    const foundAddress = featureCollection.features[0];
                    let location = foundAddress.properties.city + ", " + foundAddress.properties.country;

                    let locationInfo = document.getElementsByClassName('locationInfo')[0];
                    let latitudeInfo = document.getElementsByClassName('latitudeInfo')[0];
                    let longitudeInfo = document.getElementsByClassName('longitudeInfo')[0];
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

        else if (input.value !== ipFormat) {
            geoCode(); // geoCode
        }

        else {
            alert("Make sure you entered a valid city/country");
            // currently since the second APi autocompletes, we never end up here. I kept it for user-entered IP address that is invalid. Keep it for now, just to be able to close the if statement. Format as well, don't do just alert
        }

    })
}