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
            
                console.log(data.lat);
                console.log(data.lon);
                
                localStorage.setItem("latitude", data.lat);
                localStorage.setItem("longitude", data.lon);
            
            })
            .catch(err => console.log(err));
    }

        searchButton.addEventListener('click', () => {

        geoLocate();
            
        })
}
