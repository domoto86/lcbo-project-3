function filterAndDisplayNames(jsonData, minSalePrice, maxSalePrice, categoryFilter, madeInFilter) {
    // Filter the JSON data
    const filteredData = jsonData.filter(item => {
      const salePrice = parseFloat(item.sale_price);
      const category = item.category.trim();
      const madeIn = item.made_in.trim();
  
      return (
        salePrice >= minSalePrice &&
        salePrice <= maxSalePrice &&
        category === categoryFilter &&
        madeIn === madeInFilter
      );
    });
  
    // Get the names of the filtered items
    const filteredNames = filteredData.map(item => item.name);
  
    // Display the filtered names in a box
    const resultBox = document.getElementById("resultBox");
    resultBox.textContent = filteredNames.join(", ");
  }
  
  // Sample JSON data
  const jsonData = [
    {
      "name": "Ruffino Prosecco Rose DOC",
      "regular_price": "20.00",
      "sale_price": "18.00",
      "rating": "5.0",
      "reviews": "(2)",
      "size": "750 ml bottle",
      "description": "Ruffino has been at the forefront of Italian winemaking since 1877. This lovely prosecco rosé is light pink and expresses approachable notes of strawberry, rose petals, red berries, and peach. A refreshingly crisp finish caps the medium-bodied and flavorful palate. Pair with grilled fish over a bed of rice.",
      "category": "Rosé & Red Sparkling Wine",
      "alcohol_vol": 0.11,
      "made_in": "Friuli, Italy",
      "by": "Ruffino Srl Wines",
      "varietal": "Sparkling",
      "lat": 45.4413,
      "lon": 11.59666,
      "savings": 2
    },
    {
      "name": "Josh Cellars Pinot Grigio",
      "regular_price": "19.95",
      "sale_price": "17.95",
      "rating": "4.5",
      "reviews": "(17)",
      "size": "750 ml bottle",
      "description": "Josh Cellars is a renowned brand created to celebrate the founder's father. This delicious California Pinot Grigio is a new addition to their range of wines. It's fresh and bright, with flavors of quince, yellow berries backed up by hints of nuts and fresh bread. Sip on its own, or pair with grilled chicken or fish.",
      "category": "White Wine",
      "alcohol_vol": 0.125,
      "made_in": "California, United States",
      "by": "Josh Cellars",
      "varietal": "Pinot Grigio",
      "lat": 36.7014631,
      "lon": -118.755997,
      "savings": 2
    }
  ];
  
  // Call the function with the desired filter parameters
  filterAndDisplayNames(jsonData, 17.00, 19.00, "White Wine", "California, United States");