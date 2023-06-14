const url3 = "https://raw.githubusercontent.com/domoto86/lcbo-project-3/main/lcbo_2.json";

let map = L.map('map').setView([0, 0], 2);

// Add the base tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(map);

fetch(url3)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Check the data received

    if (Array.isArray(data)) {
      // Loop through the data array and add markers to the map
      data.forEach(entry => {
        // Retrieve the necessary properties from each entry
        let lat = entry.lat;
        let lon = entry.lon;
        let name = entry.name;

        // Create a marker and add it to the map
        L.marker([lat, lon]).addTo(map)
          .bindPopup(name);
      });
    } else {
      console.log("Invalid data format. Expected an array.");
    }
<<<<<<< Updated upstream
  ];
  
  
  // Loop through the cities array, and create one marker for each city object.
  for (let i = 0; i < countries.length; i++) {
  
    // Conditionals for country gdp_pc
    let color = "";
    if (countries[i].gdp_pc > 100000) {
      color = "#A51C42";
    }
    else if (countries[i].gdp_pc > 75000) {
      color = "#D8B438";
    }
    else if (countries[i].gdp_pc > 50000) {
      color = "#E3DCB6";
    }
    else {
      color = "#612E42";
    }
  
    // Add circles to the map.
    L.circle(countries[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust the radius.
      radius: Math.sqrt(countries[i].gdp_pc) * 500
    }).bindPopup(`<h1>${countries[i].name}</h1> <hr> <h3>GDP Per Capita (USD): ${countries[i].gdp_pc}</h3>`).addTo(myMap);
  }
=======
  })
  .catch(error => {
    console.log("Error fetching data:", error);
  });
>>>>>>> Stashed changes
