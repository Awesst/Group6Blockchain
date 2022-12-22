
**Geocoding API**

Documentation: https://www.geoapify.com/tutorial/how-to-implement-geocoding-javascript-tutorial

JSON file example this API fetches: https://api.geoapify.com/v1/geocode/search?text=Stockholm,%20Sweden&apiKey=1bdf6769d5f44e10b1c2bba7b8fe6844

This API translates address input by the user into latitude/longitude. The address does not need to be an exact match; the API is built in such a way that it autocompletes upon user input, and offers the most likely match automatically. It also recognizes locations in multiple languages, such as Roma/Rome, Italy, Nice/Nizza, France, or Stockholm/Estocolmo (Stockholm in Spanish) for Stockholm. 

This API requires registration and, hence, an APi key. Free accounts have a daily limit of requents. For the testing purposes of our prototype application, we have consistently been under that limit.


**Geolocation API**

Documentation: https://ip-api.com/docs

JSON file structure the API fetches: http://ip-api.com/json/

The geolocation API is used to display an approximate location (latitude/longitude) determined by the logged-in user's IP address. It has its limitations, such as when using a VPN, but for the purpose (i.e., building a prototype) we have selected this API as it is simple and robust to quickly extract approximate location data that we can use to store on the chain with every entry. 

Most providers that offer this service either require a paid account. ip-api is one of the few available that does not require such.

We use this API to fetch location data when the user did not actively fill in the input field; i.e., if (!input.value).


