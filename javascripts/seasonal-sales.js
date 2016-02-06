
// Additionally, put a <select> element at the top of the page that 
// contains all possible values of the season_discount key in the categories file. As soon 
// as you select one of the seasons, all prices on the page should immediately be discounted 
// by the corresponding percentage.

// For example, when Spring is chosen, all products in the corresponding Household category 
// should have their prices updated with a 15% discount off the base price.


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
		checkLoaded();
	} else {
		console.log("Error: ", products.status);
	}
}

function categoriesLoad() {
	if(categories.status === 200) {
		var categoriesData = JSON.parse(this.responseText);
		categoriesArray = categoriesData.categories;
		checkLoaded();
	} else {
		console.log("Error: ", categories.status);
	}
}

function checkLoaded() {
	// Once both JSON files have been parsed, list products on page
	if (filesLoaded) {
		listProducts();
	} else {
		filesLoaded = true;
	}
}

//							~~~			~~~		 	TO DO 		~~~			~~~

// Figure out how to apply discount (and in which function)
//			a. var discount = categoriesArray.filter(function(obj) {
//					return obj.season_discount == seasonChooser.value})
//			b. var discountPrice = productsArray[i].price * discount
//			c. Call listProducts() when select value changes (addEventListener)


function listProducts() {
	var productHTML = "";
	for (var i = 0; i < productsArray.length; i++) {
		
		// Look up object by property value
		var category = categoriesArray.filter(function(obj) {
  		return obj.id == productsArray[i].category_id;
		});

		// Construct HTML string for each product
		productHTML += `<div class="product"><p class="name">${productsArray[i].name}`;
		productHTML += `</p>`;
		productHTML += `<p class="dept">${category[0].name}</p>`;
		productHTML += `<p class="price">${productsArray[i].price}</p></div>`;

	};
	productsEl.innerHTML += productHTML;	
}




