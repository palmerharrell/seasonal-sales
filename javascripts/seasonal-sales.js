var seasonChooser = document.getElementById("seasonChooser");
var productsEl = document.getElementById("products");

var productsArray = [];
var categoriesArray = [];

var filesLoaded = false;

// Configure XHR for products.json
var products = new XMLHttpRequest();
products.addEventListener("load", productsLoad);
products.addEventListener("error", productsFail);
products.open("GET", "json/products.json");
products.send();

// Configure XHR for categories.json
var categories = new XMLHttpRequest();
categories.addEventListener("load", categoriesLoad);
categories.addEventListener("error", categoriesFail);
categories.open("GET", "json/categories.json");
categories.send();

function productsFail() {
	console.log("Something went wrong while loading products.json");
}

function categoriesFail() {
	console.log("Something went wrong while loading categories.json");
}

function productsLoad() {
	if(products.status === 200) {
		var productsData = JSON.parse(this.responseText);
		productsArray = productsData.products;
		checkIn();
	} else {
		console.log("Error: ", products.status);
	}
}

function categoriesLoad() {
	if(categories.status === 200) {
		var categoriesData = JSON.parse(this.responseText);
		categoriesArray = categoriesData.categories;
		checkIn();
	} else {
		console.log("Error: ", categories.status);
	}
}

function checkIn() {
	// Once both JSON files have been parsed, list products on page
	if (filesLoaded) {
		listProducts();
	} else {
		filesLoaded = true;
	}
}

seasonChooser.addEventListener("change", function(){
	listProducts();
});

function listProducts() {
	var productHTML = "";
	for (var i = 0; i < productsArray.length; i++) {
		
		// Look up objects by property values to get department & discount
		var currentCategory = categoriesArray.filter(function(obj) {
  		return obj.id == productsArray[i].category_id;
		});

		if (seasonChooser.value !== "None") {
			var selectedDiscount = categoriesArray.filter(function(obj) {
				return obj.season_discount == seasonChooser.value;
			});
		}

		var discountPrice = 0;

		if (seasonChooser.value !== "None") {
			if (productsArray[i].category_id == selectedDiscount[0].id) {
				discountPrice = productsArray[i].price - (productsArray[i].price * selectedDiscount[0].discount);
			} else {
					discountPrice = productsArray[i].price;
				};
	} else {
		discountPrice = productsArray[i].price;
	};

		// Construct HTML string for each product
		productHTML += `<div class="product"><p class="name">${productsArray[i].name}`;
		productHTML += `</p><p class="dept">${currentCategory[0].name}</p>`;
		productHTML += `<p class="price">${discountPrice.toFixed(2)}</p></div>`;
	};
	productsEl.innerHTML = productHTML;	
}
