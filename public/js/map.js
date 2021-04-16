

mapboxgl.accessToken = 'pk.eyJ1IjoiYmJhc3MiLCJhIjoiY2tua2RyZTFxMDVnZjJ3cWpxNGQ1ZWFhYyJ9.d6lk-5LvYwtMzZYOV-B2Aw';
var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/bbass/cknkdzwsd1jmn17qmki9eyt3o', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 18 // starting zoom
});

window.onload = async () => {
    //console.log("jkl");
    //     var loc = await fetch ("https://api.ipgeolocation.io/ipgeo?apiKey  ")
    // var jData = await loc.json();
    // console.log(jData);
    let location = false;
    let tracker;
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((p) => {
            console.log(p.coords);
            location = true;
            map.setCenter({ lon: p.coords.longitude, lat: p.coords.latitude });
        });
    }

    if (!location) {
        // geolocation not available
        if ('geolocation' in navigator) {
            let allowGeo = await navigator.permissions.query({ name: 'geolocation' });
            if (allowGeo.state == "prompt") {
                allowGeo.onchange = (e) => {
                    if (e.target.state == "granted") {

                        //console.log(e);
                        navigator.geolocation.getCurrentPosition((p) => {
                            console.log(p.coords);
                            location = true;
                            map.setCenter({ lon: p.coords.longitude, lat: p.coords.latitude });
                        });

                    }
                };
            }
        }
        getServerGeo();
    };
};

let getServerGeo = async function () {
    var loc = await fetch("/geo");
    var jData = await loc.json();

    console.log(jData);
    map.setCenter({ lon: jData.longitude, lat: jData.latitude });
}