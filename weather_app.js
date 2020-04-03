window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureSection = document.querySelector('.temperature-section');
    let temperatureSpan = document.querySelector('.temperature-section span');
    let locationTimezone = document.querySelector('.location-timezone');
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/c27152790c67a785a74c6618e4d4b067/${lat},${long}`;

            // Fetch data, and THEN... ("then" to wait for the fetch to complete first)
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // same like data.currently.temperature
                    let {temperature, summary, icon} = data.currently;

                    temperature = Math.floor(temperature);

                    // Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // Celcius formula
                    let celcius = (temperature - 32) * (5 / 9);
                    
                    // Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    // TODO: MAKE SEPARATE FUNCTION
                    // Change temp to celcius/fahrenheit
                    // listen to 'click' event
                    temperatureSection.addEventListener('click', () => {
                        // === forces type
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });

                });
        });
    } else {
        h1.textContent = "not workinggggggg";
    }

    // skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        // replace - with _ because data from api is ex. "partly-cloudy"
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
